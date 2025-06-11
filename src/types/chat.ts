export type MessageType = 'user' | 'bot';

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
}

export interface ChatSession {
  sessionId: string;
  messages: Message[];
  usageCount: number;
  isCompleted: boolean;
}

export interface UBTIQuestion {
  step: number;
  question: string;
  options?: string[];
}

export interface UBTIResponse {
  completed: boolean;
  message: string;
  nextQuestion?: UBTIQuestion;
}
