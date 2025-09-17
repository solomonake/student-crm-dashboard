export interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  grade?: string;
  country: string;
  applicationStatus: 'exploring' | 'shortlisting' | 'applying' | 'submitted';
  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Interaction {
  id: string;
  type: 'login' | 'ai_question' | 'document_upload' | 'stage_change' | 'email' | 'call' | 'meeting';
  content: string;
  timestamp: Date;
  userId: string;
  metadata?: {
    documentType?: string;
    questionTopic?: string;
    stageFrom?: string;
    stageTo?: string;
  };
}

export interface Communication {
  id: string;
  type: 'email' | 'sms' | 'call';
  content: string;
  timestamp: Date;
  userId: string;
  direction: 'inbound' | 'outbound';
}

export interface Note {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface Reminder {
  id: string;
  title: string;
  date: Date;
  completed: boolean;
  createdAt: Date;
  userId: string;
}
