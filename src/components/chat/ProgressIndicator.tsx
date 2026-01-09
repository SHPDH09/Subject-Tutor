import { Subject, subjectConfig } from '@/types/chat';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  subject: Subject;
  progress: number;
  messagesCount: number;
}

export function ProgressIndicator({ subject, progress, messagesCount }: ProgressIndicatorProps) {
  const config = subjectConfig[subject];
  const activeTopicIndex = Math.min(
    Math.floor((messagesCount / 4) % config.topics.length),
    config.topics.length - 1
  );

  return (
    <div className="space-y-3 pt-2 border-t">
      <div className="flex items-center justify-between px-2">
        <p className="text-xs font-medium text-muted-foreground">Progress</p>
        <span className="text-xs font-medium text-primary">{Math.round(progress)}%</span>
      </div>
      
      {/* Progress bar */}
      <div className="h-1 bg-muted rounded-full overflow-hidden mx-2">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Current topic */}
      <div className="px-2 space-y-1.5">
        <p className="text-xs text-muted-foreground">Current topic</p>
        <div className="flex flex-wrap gap-1">
          {config.topics.slice(0, 4).map((topic, index) => (
            <span
              key={topic}
              className={cn(
                "px-2 py-0.5 text-xs rounded-md",
                index === activeTopicIndex
                  ? "bg-primary text-primary-foreground"
                  : index < activeTopicIndex
                  ? "bg-success/20 text-success"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 px-2">
        <div className="bg-muted/50 rounded-lg p-2">
          <p className="text-[10px] text-muted-foreground">Questions</p>
          <p className="text-sm font-medium">{Math.ceil(messagesCount / 2)}</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-2">
          <p className="text-[10px] text-muted-foreground">Topics</p>
          <p className="text-sm font-medium">{activeTopicIndex + 1}</p>
        </div>
      </div>
    </div>
  );
}