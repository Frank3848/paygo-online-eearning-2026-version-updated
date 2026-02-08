import { useRef, useEffect, useState } from 'react';
import { X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatMessage } from './chat/ChatMessage';
import { ChatInput } from './chat/ChatInput';
import { useChat } from '@/hooks/useChat';

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatAssistant = ({ isOpen, onClose }: ChatAssistantProps) => {
  const { messages, isLoading, sendMessage } = useChat();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-4 bottom-24 z-50 animate-[slide-in-up_0.3s_ease-out]">
      <div className="bg-card rounded-2xl shadow-2xl overflow-hidden max-w-md mx-auto border border-border">
        {/* Header */}
        <div className="bg-accent px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-foreground/20 flex items-center justify-center">
              <span className="text-lg">🤖</span>
            </div>
            <div>
              <h3 className="text-accent-foreground font-semibold text-lg">PayGo Assistant</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-success" />
                <p className="text-accent-foreground/80 text-sm">Online</p>
              </div>
            </div>
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
        <div className="h-80 overflow-y-auto p-4 space-y-3 bg-background">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              text={message.text}
              isAssistant={message.isAssistant}
              isStreaming={isLoading && message.id === messages[messages.length - 1]?.id}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
