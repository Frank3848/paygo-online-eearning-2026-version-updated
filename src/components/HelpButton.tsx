import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HelpButton = () => {
  return (
    <Button
      size="icon"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-accent hover:bg-accent/90 shadow-lg transition-transform hover:scale-105 animate-fade-in"
      onClick={() => {
        // Open help chat
        console.log('Help button clicked');
      }}
    >
      <MessageCircle className="h-6 w-6 text-accent-foreground" />
    </Button>
  );
};
