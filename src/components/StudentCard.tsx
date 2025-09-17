'use client';

import { Student } from '@/types/student';

interface StudentCardProps {
  student: Student;
}

export default function StudentCard({ student }: StudentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'exploring':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shortlisting':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'applying':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'submitted':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-start space-x-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
            {student.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Student Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 truncate">
              {student.name}
            </h1>
            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(student.applicationStatus)}`}>
              {student.applicationStatus.charAt(0).toUpperCase() + student.applicationStatus.slice(1)}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.email}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Country</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.country}</dd>
            </div>

            {student.phone && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.phone}</dd>
              </div>
            )}

            {student.grade && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Grade</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.grade}</dd>
              </div>
            )}

            <div>
              <dt className="text-sm font-medium text-gray-500">Last Active</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatDate(student.lastActive)}</dd>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
