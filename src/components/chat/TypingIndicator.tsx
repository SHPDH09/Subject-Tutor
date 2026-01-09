export function TypingIndicator() {
  return (
    <div className="flex gap-2 fade-in">
      <div className="bg-tutor rounded-2xl rounded-tl-md px-4 py-3">
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full typing-dot" />
          <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full typing-dot" />
          <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full typing-dot" />
        </div>
      </div>
    </div>
  );
}