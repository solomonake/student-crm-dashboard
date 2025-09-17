'use client';

import { Student, Interaction } from '@/types/student';

interface AISummaryCardProps {
  student: Student;
  interactions: Interaction[];
}

export default function AISummaryCard({ student, interactions }: AISummaryCardProps) {
  const generateAISummary = () => {
    const aiQuestions = interactions.filter(i => i.type === 'ai_question');
    const documentUploads = interactions.filter(i => i.type === 'document_upload');
    const stageChanges = interactions.filter(i => i.type === 'stage_change');
    const logins = interactions.filter(i => i.type === 'login');
    
    const essayQuestions = aiQuestions.filter(q => 
      q.content.toLowerCase().includes('essay') || 
      q.content.toLowerCase().includes('personal statement') ||
      q.content.toLowerCase().includes('writing')
    );
    
    const satQuestions = aiQuestions.filter(q => 
      q.content.toLowerCase().includes('sat') || 
      q.content.toLowerCase().includes('test') ||
      q.content.toLowerCase().includes('score')
    );
    
    const transcriptUploads = documentUploads.filter(d => 
      d.metadata?.documentType?.toLowerCase().includes('transcript') ||
      d.content.toLowerCase().includes('transcript')
    );
    
    const essayUploads = documentUploads.filter(d => 
      d.metadata?.documentType?.toLowerCase().includes('essay') ||
      d.content.toLowerCase().includes('essay')
    );
    
    let summary = `AI Summary: This student is in the ${student.applicationStatus.charAt(0).toUpperCase() + student.applicationStatus.slice(1)} stage`;
    
    // Add activity insights
    const insights = [];
    
    if (aiQuestions.length > 0) {
      insights.push(`frequently asks AI questions (${aiQuestions.length} total)`);
    }
    
    if (essayQuestions.length >= 3) {
      insights.push('shows strong interest in essay support');
    }
    
    if (satQuestions.length >= 2) {
      insights.push('actively researching test requirements');
    }
    
    if (documentUploads.length > 0) {
      insights.push(`has uploaded ${documentUploads.length} document${documentUploads.length > 1 ? 's' : ''}`);
    }
    
    if (logins.length >= 5) {
      insights.push('is highly engaged with the platform');
    }
    
    if (insights.length > 0) {
      summary += `, ${insights.join(', ')}`;
    }
    
    // Add recommendations
    const recommendations = [];
    
    if (student.applicationStatus === 'exploring' && aiQuestions.length < 2) {
      recommendations.push('encourage more AI interactions to understand needs');
    }
    
    if (essayQuestions.length >= 3 || essayUploads.length > 0) {
      recommendations.push('follow up on essay support');
    }
    
    if (satQuestions.length >= 2) {
      recommendations.push('provide test preparation resources');
    }
    
    if (student.applicationStatus === 'shortlisting' && documentUploads.length === 0) {
      recommendations.push('guide on document preparation');
    }
    
    if (student.applicationStatus === 'applying' && transcriptUploads.length === 0) {
      recommendations.push('remind about transcript requirements');
    }
    
    if (recommendations.length > 0) {
      summary += `. Recommended: ${recommendations.join(', ')}`;
    }
    
    return summary + '.';
  };

  const getStageInsight = () => {
    switch (student.applicationStatus) {
      case 'exploring':
        return {
          icon: (
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          ),
          color: 'bg-blue-50 border-blue-200',
          textColor: 'text-blue-800'
        };
      case 'shortlisting':
        return {
          icon: (
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          ),
          color: 'bg-purple-50 border-purple-200',
          textColor: 'text-purple-800'
        };
      case 'applying':
        return {
          icon: (
            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          color: 'bg-orange-50 border-orange-200',
          textColor: 'text-orange-800'
        };
      case 'submitted':
        return {
          icon: (
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          color: 'bg-green-50 border-green-200',
          textColor: 'text-green-800'
        };
      default:
        return {
          icon: (
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          color: 'bg-gray-50 border-gray-200',
          textColor: 'text-gray-800'
        };
    }
  };

  const stageInsight = getStageInsight();

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex-shrink-0">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">AI Summary</h3>
      </div>

      <div className={`p-4 rounded-lg border ${stageInsight.color} mb-4`}>
        <div className="flex items-center space-x-2">
          {stageInsight.icon}
          <span className={`text-sm font-medium ${stageInsight.textColor}`}>
            Currently in {student.applicationStatus.charAt(0).toUpperCase() + student.applicationStatus.slice(1)} stage
          </span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          {generateAISummary()}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {interactions.filter(i => i.type === 'ai_question').length}
          </div>
          <div className="text-xs text-gray-500">AI Questions</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {interactions.filter(i => i.type === 'document_upload').length}
          </div>
          <div className="text-xs text-gray-500">Documents</div>
        </div>
      </div>
    </div>
  );
}
