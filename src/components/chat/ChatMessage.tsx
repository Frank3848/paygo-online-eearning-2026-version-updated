import ReactMarkdown from 'react-markdown';
import { Loader2 } from 'lucide-react';

interface ChatMessageProps {
  text: string;
  isAssistant: boolean;
  isStreaming?: boolean;
}

export const ChatMessage = ({ text, isAssistant, isStreaming }: ChatMessageProps) => {
  if (isAssistant && isStreaming && !text) {
    return (
      <div className="flex justify-start">
        <div className="bg-muted px-4 py-3 rounded-2xl">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          isAssistant
            ? 'bg-muted text-foreground'
            : 'bg-accent text-accent-foreground'
        }`}
      >
        {isAssistant ? (
          <div className="text-sm prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm whitespace-pre-wrap">{text}</p>
        )}
      </div>
    </div>
  );
};
