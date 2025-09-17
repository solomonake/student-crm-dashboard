'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import StudentCard from '@/components/StudentCard';
import ProgressBar from '@/components/ProgressBar';
import InteractionTimeline from '@/components/InteractionTimeline';
import CommunicationLog from '@/components/CommunicationLog';
import NotesSection from '@/components/NotesSection';
import RemindersSection from '@/components/RemindersSection';
import AISummaryCard from '@/components/AISummaryCard';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import { Student, Interaction, Note, Reminder } from '@/types/student';

export default function StudentProfile() {
  const params = useParams();
  const studentId = params.id as string;

  // Mock data - in a real app, this would come from Firebase
  const [student, setStudent] = useState<Student | null>(null);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for demonstration - realistic student profile
    const mockStudent: Student = {
      id: studentId,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43210',
      grade: '12th Grade',
      country: 'India',
      applicationStatus: 'shortlisting',
      lastActive: new Date('2024-01-15'),
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15'),
    };

    const mockInteractions: Interaction[] = [
      {
        id: '1',
        type: 'login',
        content: 'Student logged into platform',
        timestamp: new Date('2024-01-01'),
        userId: 'user1',
      },
      {
        id: '2',
        type: 'ai_question',
        content: 'Asked AI: "What SAT score do I need for computer science at MIT?"',
        timestamp: new Date('2024-01-03'),
        userId: 'user1',
        metadata: { questionTopic: 'test_scores' }
      },
      {
        id: '3',
        type: 'ai_question',
        content: 'Asked AI: "How to write a strong personal statement for engineering programs?"',
        timestamp: new Date('2024-01-05'),
        userId: 'user1',
        metadata: { questionTopic: 'essay_writing' }
      },
      {
        id: '4',
        type: 'document_upload',
        content: 'Uploaded high school transcript',
        timestamp: new Date('2024-01-08'),
        userId: 'user1',
        metadata: { documentType: 'transcript' }
      },
      {
        id: '5',
        type: 'stage_change',
        content: 'Moved from Exploring to Shortlisting stage',
        timestamp: new Date('2024-01-10'),
        userId: 'system',
        metadata: { stageFrom: 'exploring', stageTo: 'shortlisting' }
      },
      {
        id: '6',
        type: 'ai_question',
        content: 'Asked AI: "Which colleges have the best computer science programs for international students?"',
        timestamp: new Date('2024-01-12'),
        userId: 'user1',
        metadata: { questionTopic: 'college_selection' }
      },
      {
        id: '7',
        type: 'login',
        content: 'Student logged into platform',
        timestamp: new Date('2024-01-15'),
        userId: 'user1',
      },
    ];

    const mockNotes: Note[] = [
      {
        id: '1',
        content: 'Student shows strong interest in computer science programs. Very engaged with AI questions about test scores and essays.',
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-05'),
        userId: 'user1',
      },
      {
        id: '2',
        content: 'Uploaded transcript successfully. Ready to move to next stage of application process.',
        createdAt: new Date('2024-01-08'),
        updatedAt: new Date('2024-01-08'),
        userId: 'user2',
      },
      {
        id: '3',
        content: 'Frequently asks essay-related questions. Consider offering essay writing workshop or one-on-one support.',
        createdAt: new Date('2024-01-12'),
        updatedAt: new Date('2024-01-12'),
        userId: 'user1',
      },
    ];

    const mockReminders: Reminder[] = [
      {
        id: '1',
        title: 'Follow up on essay support offer',
        date: new Date('2024-01-20'),
        completed: false,
        createdAt: new Date('2024-01-12'),
        userId: 'user1',
      },
      {
        id: '2',
        title: 'Check on college shortlist completion',
        date: new Date('2024-01-25'),
        completed: false,
        createdAt: new Date('2024-01-10'),
        userId: 'user1',
      },
      {
        id: '3',
        title: 'Send application deadline reminders',
        date: new Date('2024-02-01'),
        completed: true,
        createdAt: new Date('2024-01-08'),
        userId: 'user2',
      },
    ];

    // Simulate loading
    setTimeout(() => {
      setStudent(mockStudent);
      setInteractions(mockInteractions);
      setNotes(mockNotes);
      setReminders(mockReminders);
      setLoading(false);
    }, 1000);
  }, [studentId]);

  const handleAddInteraction = (type: string, content: string) => {
    const newInteraction: Interaction = {
      id: Date.now().toString(),
      type: type as Interaction['type'],
      content,
      timestamp: new Date(),
      userId: 'current-user',
    };
    setInteractions(prev => [newInteraction, ...prev]);
  };

  const handleAddNote = (content: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'current-user',
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const handleUpdateNote = (noteId: string, content: string) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId 
        ? { ...note, content, updatedAt: new Date() }
        : note
    ));
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const handleAddReminder = (title: string, date: Date) => {
    const newReminder: Reminder = {
      id: Date.now().toString(),
      title,
      date,
      completed: false,
      createdAt: new Date(),
      userId: 'current-user',
    };
    setReminders(prev => [newReminder, ...prev]);
  };

  const handleUpdateReminder = (reminderId: string, title: string, date: Date) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === reminderId 
        ? { ...reminder, title, date, updatedAt: new Date() }
        : reminder
    ));
  };

  const handleDeleteReminder = (reminderId: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== reminderId));
  };

  const handleToggleReminder = (reminderId: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === reminderId 
        ? { ...reminder, completed: !reminder.completed }
        : reminder
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading student profile...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Student Not Found</h1>
          <p className="text-gray-600">The requested student could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <div>
                  <a href="/" className="text-gray-400 hover:text-gray-500">
                    <svg className="flex-shrink-0 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    <span className="sr-only">Home</span>
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <a href="/" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                    Students
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-4 text-sm font-medium text-gray-500">
                    {student.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Student Card */}
        <div className="mb-8">
          <StudentCard student={student} />
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar student={student} />
        </div>

        {/* AI Summary Card */}
        <div className="mb-8">
          <AISummaryCard student={student} interactions={interactions} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <InteractionTimeline interactions={interactions} />
            <NotesSection 
              notes={notes}
              onAddNote={handleAddNote}
              onUpdateNote={handleUpdateNote}
              onDeleteNote={handleDeleteNote}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <CommunicationLog 
              interactions={interactions}
              onAddInteraction={handleAddInteraction}
            />
            <RemindersSection 
              reminders={reminders}
              onAddReminder={handleAddReminder}
              onUpdateReminder={handleUpdateReminder}
              onDeleteReminder={handleDeleteReminder}
              onToggleReminder={handleToggleReminder}
            />
          </div>
        </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
