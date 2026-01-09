import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send, RotateCcw, Zap, BookOpen } from 'lucide-react';
import { Subject, subjectConfig } from '@/types/chat';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onReexplain: () => void;
  onQuiz: () => void;
  isLoading: boolean;
  subject: Subject;
  hasMessages: boolean;
}

export function ChatInput({
  onSendMessage,
  onReexplain,
  onQuiz,
  isLoading,
  subject,
  hasMessages,
}: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const config = subjectConfig[subject];

  return (
    <div className="border-t glass p-3">
      {/* Quick actions */}
      {hasMessages && (
        <div className="flex gap-1.5 mb-2">
          <button
            onClick={onReexplain}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md bg-muted hover:bg-accent transition-colors disabled:opacity-50"
          >
            <RotateCcw className="w-3 h-3" />
            Re-explain
          </button>
          <button
            onClick={onQuiz}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md bg-success/10 text-success hover:bg-success/20 transition-colors disabled:opacity-50"
          >
            <Zap className="w-3 h-3" />
            Quiz me
          </button>
          <button
            onClick={() => onSendMessage("Give me a real example")}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md bg-muted hover:bg-accent transition-colors disabled:opacity-50"
          >
            <BookOpen className="w-3 h-3" />
            Example
          </button>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 items-end">
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask about ${config.name}...`}
            disabled={isLoading}
            rows={1}
            className={cn(
              "w-full resize-none rounded-lg border bg-background px-3 py-2.5 text-sm",
              "placeholder:text-muted-foreground/60",
              "focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary",
              "disabled:opacity-50"
            )}
          />
        </div>
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || isLoading}
          className="h-10 w-10 shrink-0"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}