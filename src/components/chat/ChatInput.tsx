import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export const ChatInput = ({ value, onChange, onSend, isLoading }: ChatInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-4 border-t border-border bg-background flex gap-2">
      <Input
        placeholder="Type your message..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        className="flex-1 h-12 bg-muted border-0 rounded-xl"
      />
      <Button
        size="icon"
        onClick={onSend}
        disabled={isLoading || !value.trim()}
        className="h-12 w-12 rounded-xl bg-accent hover:bg-accent/90"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-accent-foreground" />
        ) : (
          <Send className="h-5 w-5 text-accent-foreground" />
        )}
      </Button>
    </div>
  );
};
