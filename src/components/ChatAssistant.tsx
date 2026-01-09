import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: number;
  text: string;
  isAssistant: boolean;
}

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatAssistant = ({ isOpen, onClose }: ChatAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm PayGo Assistant. How can I help you today?",
      isAssistant: true,
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isAssistant: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: messages.length + 2,
        text: "Thank you for your message! Our team will assist you shortly.",
        isAssistant: true,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
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
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-background flex gap-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 h-12 bg-muted border-0 rounded-xl"
          />
          <Button
            size="icon"
            onClick={handleSend}
            className="h-12 w-12 rounded-xl bg-accent hover:bg-accent/90"
          >
            <Send className="h-5 w-5 text-accent-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
};
