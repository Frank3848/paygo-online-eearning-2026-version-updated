import { useState, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface ChatMessage {
  id: number;
  text: string;
  isAssistant: boolean;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`;

export const useChat = () => {
  const { toast } = useToast();
  const nextId = useRef(2);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hello! I'm PayGo Assistant. How can I help you today? 😊",
      isAssistant: true,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (inputValue: string) => {
    if (!inputValue.trim() || isLoading) return;

    const userMsgId = nextId.current++;
    const assistantMsgId = nextId.current++;

    const userMessage: ChatMessage = {
      id: userMsgId,
      text: inputValue,
      isAssistant: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const conversationHistory = [
      ...messages.map((msg) => ({
        role: msg.isAssistant ? 'assistant' as const : 'user' as const,
        content: msg.text,
      })),
      { role: 'user' as const, content: inputValue },
    ];

    try {
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: conversationHistory }),
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to get response');
      }

      if (!resp.body) throw new Error('No response body');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';
      let textBuffer = '';

      setMessages((prev) => [...prev, { id: assistantMsgId, text: '', isAssistant: true }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantText += content;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsgId ? { ...m, text: assistantText } : m
                )
              );
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send message',
      });
      setMessages((prev) => prev.filter((m) => m.text !== ''));
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, toast]);

  return { messages, isLoading, sendMessage };
};
