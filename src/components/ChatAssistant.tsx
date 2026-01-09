import { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  text: string;
  isAssistant: boolean;
}

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`;

export const ChatAssistant = ({ isOpen, onClose }: ChatAssistantProps) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm PayGo Assistant. How can I help you today?",
      isAssistant: true,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isAssistant: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Build conversation history for AI
    const conversationHistory = [
      ...messages.map((msg) => ({
        role: msg.isAssistant ? 'assistant' : 'user',
        content: msg.text,
      })),
      { role: 'user', content: inputValue },
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

      // Add empty assistant message to stream into
      const assistantMsgId = messages.length + 2;
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
      // Remove the empty assistant message on error
      setMessages((prev) => prev.filter((m) => m.text !== ''));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-4 bottom-24 z-50 animate-[slide-in-up_0.3s_ease-out]">
      <div className="bg-card rounded-2xl shadow-2xl overflow-hidden max-w-md mx-auto border border-border">
        {/* Header */}
        <div className="bg-accent px-4 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-accent-foreground font-semibold text-lg">PayGo Assistant</h3>
            <p className="text-accent-foreground/80 text-sm">Online</p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            className="text-accent-foreground hover:bg-accent-foreground/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="h-72 overflow-y-auto p-4 space-y-3 bg-background">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isAssistant ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  message.isAssistant
                    ? 'bg-muted text-foreground'
                    : 'bg-accent text-accent-foreground'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.text === '' && (
            <div className="flex justify-start">
              <div className="bg-muted px-4 py-3 rounded-2xl">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-background flex gap-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1 h-12 bg-muted border-0 rounded-xl"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            className="h-12 w-12 rounded-xl bg-accent hover:bg-accent/90"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-accent-foreground" />
            ) : (
              <Send className="h-5 w-5 text-accent-foreground" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
