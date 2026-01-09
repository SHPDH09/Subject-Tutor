import { Subject, subjectConfig } from '@/types/chat';
import { ArrowRight } from 'lucide-react';

interface WelcomeMessageProps {
  subject: Subject;
  onStartConversation: (topic: string) => void;
}

export function WelcomeMessage({ subject, onStartConversation }: WelcomeMessageProps) {
  const config = subjectConfig[subject];

  const starterQuestions: Record<Subject, string[]> = {
    python: [
      "What are variables?",
      "Explain functions",
      "How do loops work?",
    ],
    dsa: [
      "What is Big O?",
      "Arrays vs Linked Lists",
      "Explain binary search",
    ],
    sql: [
      "SELECT basics",
      "How JOINs work",
      "Primary keys",
    ],
    javascript: [
      "let vs const vs var",
      "How Promises work",
      "What are closures?",
    ],
    react: [
      "What are components?",
      "useState explained",
      "Props vs State",
    ],
    'system-design': [
      "URL shortener design",
      "Scaling basics",
      "Load balancing",
    ],
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-sm w-full slide-up">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
          <span className="text-2xl">{config.icon}</span>
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-foreground mb-1">
          {config.name}
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          {config.description}
        </p>

        {/* Quick starts */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground mb-2">Try asking</p>
          {starterQuestions[subject].map((question) => (
            <button
              key={question}
              onClick={() => onStartConversation(question)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-card border hover:bg-accent hover:border-primary/20 transition-colors text-left group"
            >
              <span className="text-sm text-foreground">{question}</span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          ))}
        </div>

        {/* Topics */}
        <div className="mt-6 pt-4 border-t">
          <p className="text-xs text-muted-foreground mb-2">Topics covered</p>
          <div className="flex flex-wrap gap-1.5">
            {config.topics.slice(0, 5).map((topic) => (
              <span
                key={topic}
                className="px-2 py-0.5 text-xs rounded-md bg-muted text-muted-foreground"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}