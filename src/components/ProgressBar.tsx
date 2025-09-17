'use client';

import { Student } from '@/types/student';

interface ProgressBarProps {
  student: Student;
}

export default function ProgressBar({ student }: ProgressBarProps) {
  const stages = [
    { key: 'exploring', label: 'Exploring', color: 'bg-blue-500' },
    { key: 'shortlisting', label: 'Shortlisting', color: 'bg-purple-500' },
    { key: 'applying', label: 'Applying', color: 'bg-orange-500' },
    { key: 'submitted', label: 'Submitted', color: 'bg-green-500' },
  ];

  const currentStageIndex = stages.findIndex(stage => stage.key === student.applicationStatus);
  const progressPercentage = ((currentStageIndex + 1) / stages.length) * 100;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Progress</h3>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              stages[currentStageIndex]?.color || 'bg-gray-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Stage Indicators */}
      <div className="space-y-3">
        {stages.map((stage, index) => {
          const isCompleted = index < currentStageIndex;
          const isCurrent = index === currentStageIndex;
          const isUpcoming = index > currentStageIndex;

          return (
            <div key={stage.key} className="flex items-center space-x-3">
              <div
                className={`w-4 h-4 rounded-full flex-shrink-0 ${
                  isCompleted
                    ? 'bg-green-500'
                    : isCurrent
                    ? stage.color
                    : 'bg-gray-300'
                }`}
              >
                {isCompleted && (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <span
                className={`text-sm ${
                  isCompleted
                    ? 'text-green-700 font-medium'
                    : isCurrent
                    ? 'text-gray-900 font-semibold'
                    : 'text-gray-500'
                }`}
              >
                {stage.label}
              </span>
              {isCurrent && (
                <span className="inline-flex px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                  Current
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Current Stage Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-1">Current Stage</h4>
        <p className="text-sm text-blue-700">
          {stages[currentStageIndex]?.label || 'Unknown Stage'}
        </p>
      </div>
    </div>
  );
}
