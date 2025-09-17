# Student CRM Dashboard

**GitHub Repo:** [https://github.com/YOUR_USERNAME/student-crm-dashboard](https://github.com/YOUR_USERNAME/student-crm-dashboard)

A comprehensive Next.js application for managing student engagement, communication, and application progress at undergraduation.com. Built with TypeScript, Tailwind CSS, and Firebase integration.

## Features

### 🎯 Dashboard Overview
- **Stats Overview**: Real-time statistics showing total students, application statuses, and quick filters
- **Student Directory**: Searchable and filterable table of all student applications
- **Quick Filters**: Filter students who haven't been contacted in 7 days, high intent students, and those needing essay help

### 👥 Student Management
- **Student Table**: View all students with columns for Name, Email, Country, Application Status, and Last Active
- **Search & Filter**: Search by name, email, or country with status-based filtering
- **Navigation**: Click any row to view detailed student profile

### 📋 Student Profiles
- **Student Card**: Complete student information including contact details, grade, and country
- **Progress Bar**: Visual representation of application progress through 4 stages (Exploring → Shortlisting → Applying → Submitted)
- **Interaction Timeline**: Chronological view of logins, AI questions asked, documents uploaded, and application stage changes
- **Communication Log**: Add and manage emails, calls, and meetings
- **Notes Section**: Create, edit, and delete internal notes for each student
- **Reminders Section**: Add, edit, delete, and mark reminders as complete with due dates
- **AI Summary Card**: Intelligent summary of student activity with recommendations based on profile data

### 📊 Application Stages
- **Exploring**: Student is researching colleges and programs
- **Shortlisting**: Student is narrowing down their college choices
- **Applying**: Student is actively submitting applications
- **Submitted**: Student has completed their applications

### 🔐 Authentication
- Implemented with Firebase Auth (email/password)
- Users must log in to access dashboard
- Signup enabled for demo purposes
- Logout supported from Navbar
- Protected routes with automatic redirects

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd internship-crm-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Firestore Database
   - Enable Authentication (Email/Password)
   - Get your Firebase configuration

4. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```
   Replace with values from your Firebase console.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)
   - You'll be redirected to the login page
   - Create a new account or sign in with existing credentials
   - Access the dashboard after authentication

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── students/[id]/     # Dynamic student profile pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Dashboard home page
├── components/            # Reusable React components
│   ├── StudentTable.tsx   # Main student directory table
│   ├── StudentCard.tsx    # Student profile card
│   ├── ProgressBar.tsx    # Application progress visualization
│   ├── InteractionTimeline.tsx # Timeline of interactions
│   ├── CommunicationLog.tsx # Communication management
│   ├── NotesSection.tsx   # Notes management
│   └── StatsOverview.tsx  # Dashboard statistics
├── lib/
│   └── firebase.ts        # Firebase configuration
└── types/
    └── student.ts         # TypeScript type definitions
```

## Data Models

### Student
```typescript
interface Student {
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
```

### Interaction
```typescript
interface Interaction {
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
```

### Communication
```typescript
interface Communication {
  id: string;
  type: 'email' | 'sms' | 'call';
  content: string;
  timestamp: Date;
  userId: string;
  direction: 'inbound' | 'outbound';
}
```

### Reminder
```typescript
interface Reminder {
  id: string;
  title: string;
  date: Date;
  completed: boolean;
  createdAt: Date;
  userId: string;
}
```

### Note
```typescript
interface Note {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
```

## Firebase Setup

### Firestore Collections

1. **students**: Store student application data
2. **interactions**: Store all interactions with students (logins, AI questions, document uploads, stage changes)
3. **communications**: Store manual communications (emails, calls, meetings)
4. **notes**: Store internal notes for each student
5. **reminders**: Store reminders and tasks for each student

### Security Rules (Example)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Students collection - read/write for authenticated users
    match /students/{studentId} {
      allow read, write: if request.auth != null;
    }
    
    // Interactions collection
    match /interactions/{interactionId} {
      allow read, write: if request.auth != null;
    }
    
    // Communications collection
    match /communications/{communicationId} {
      allow read, write: if request.auth != null;
    }
    
    // Notes collection
    match /notes/{noteId} {
      allow read, write: if request.auth != null;
    }
    
    // Reminders collection
    match /reminders/{reminderId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Manual Deployment

```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@example.com or create an issue in the GitHub repository.