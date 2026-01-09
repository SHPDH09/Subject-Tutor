export type Subject = 'python' | 'dsa' | 'sql' | 'javascript' | 'react' | 'system-design';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  subject: Subject;
  isLoading: boolean;
  progress: number;
}

export const subjectConfig: Record<Subject, {
  name: string;
  icon: string;
  description: string;
  topics: string[];
}> = {
  python: {
    name: 'Python',
    icon: '🐍',
    description: 'Learn Python programming from basics to advanced concepts',
    topics: ['Variables', 'Functions', 'Loops', 'OOP', 'Data Structures', 'File Handling'],
  },
  dsa: {
    name: 'DSA',
    icon: '🧮',
    description: 'Master DSA concepts for coding interviews',
    topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Sorting', 'DP'],
  },
  sql: {
    name: 'SQL',
    icon: '🗃️',
    description: 'Learn database queries and management',
    topics: ['SELECT', 'JOINs', 'Aggregations', 'Subqueries', 'Indexing', 'Transactions'],
  },
  javascript: {
    name: 'JavaScript',
    icon: '⚡',
    description: 'Master JavaScript from fundamentals to ES6+',
    topics: ['Variables', 'Functions', 'Async/Await', 'DOM', 'Closures', 'Promises'],
  },
  react: {
    name: 'React',
    icon: '⚛️',
    description: 'Build modern UIs with React components and hooks',
    topics: ['Components', 'Props', 'State', 'Hooks', 'Context', 'Effects'],
  },
  'system-design': {
    name: 'System Design',
    icon: '🏗️',
    description: 'Design scalable systems for interviews and real-world apps',
    topics: ['Scalability', 'Databases', 'Caching', 'Load Balancing', 'APIs', 'Microservices'],
  },
};
