'use client';

import { useState, useEffect } from 'react';
import StatsOverview from '@/components/StatsOverview';
import StudentTable from '@/components/StudentTable';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import { Student } from '@/types/student';

export default function Dashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for demonstration - Undergraduation.com style
    const mockStudents: Student[] = [
      {
        id: '1',
        name: 'Priya Sharma',
        email: 'priya.sharma@email.com',
        phone: '+91 98765 43210',
        grade: '12th Grade',
        country: 'India',
        applicationStatus: 'shortlisting',
        lastActive: new Date('2024-01-15'),
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: '2',
        name: 'David Chen',
        email: 'david.chen@email.com',
        phone: '+1 (555) 123-4567',
        grade: '11th Grade',
        country: 'United States',
        applicationStatus: 'exploring',
        lastActive: new Date('2024-01-20'),
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-20'),
      },
      {
        id: '3',
        name: 'Fatima Al-Zahra',
        email: 'fatima.alzahra@email.com',
        phone: '+971 50 123 4567',
        grade: '12th Grade',
        country: 'UAE',
        applicationStatus: 'applying',
        lastActive: new Date('2024-01-18'),
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-18'),
      },
      {
        id: '4',
        name: 'James Wilson',
        email: 'james.wilson@email.com',
        phone: '+44 20 1234 5678',
        grade: '12th Grade',
        country: 'United Kingdom',
        applicationStatus: 'submitted',
        lastActive: new Date('2024-01-22'),
        createdAt: new Date('2024-01-03'),
        updatedAt: new Date('2024-01-22'),
      },
      {
        id: '5',
        name: 'Aisha Patel',
        email: 'aisha.patel@email.com',
        phone: '+91 98765 12345',
        grade: '11th Grade',
        country: 'India',
        applicationStatus: 'exploring',
        lastActive: new Date('2024-01-08'),
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-08'),
      },
      {
        id: '6',
        name: 'Michael Rodriguez',
        email: 'michael.rodriguez@email.com',
        phone: '+1 (555) 987-6543',
        grade: '12th Grade',
        country: 'Canada',
        applicationStatus: 'shortlisting',
        lastActive: new Date('2024-01-25'),
        createdAt: new Date('2024-01-12'),
        updatedAt: new Date('2024-01-25'),
      },
      {
        id: '7',
        name: 'Yuki Tanaka',
        email: 'yuki.tanaka@email.com',
        phone: '+81 3 1234 5678',
        grade: '12th Grade',
        country: 'Japan',
        applicationStatus: 'applying',
        lastActive: new Date('2024-01-05'),
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-05'),
      },
      {
        id: '8',
        name: 'Maria Santos',
        email: 'maria.santos@email.com',
        phone: '+55 11 98765 4321',
        grade: '12th Grade',
        country: 'Brazil',
        applicationStatus: 'submitted',
        lastActive: new Date('2024-01-28'),
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-28'),
      },
    ];

    // Simulate loading
    setTimeout(() => {
      setStudents(mockStudents);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Student CRM Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Internal dashboard for managing student engagement, communication, and application progress at undergraduation.com.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="mb-8">
          <StatsOverview students={students} />
        </div>

        {/* Student Table */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Student Directory</h2>
            <p className="mt-1 text-sm text-gray-600">
              Browse and manage all student applications
            </p>
          </div>
          <StudentTable students={students} />
        </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}