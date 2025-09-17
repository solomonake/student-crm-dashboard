'use client';

import { useState } from 'react';
import { Interaction } from '@/types/student';

interface CommunicationLogProps {
  interactions: Interaction[];
  onAddInteraction: (type: string, content: string) => void;
}

export default function CommunicationLog({ interactions, onAddInteraction }: CommunicationLogProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newInteractionType, setNewInteractionType] = useState('email');
  const [newInteractionContent, setNewInteractionContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newInteractionContent.trim()) {
      onAddInteraction(newInteractionType, newInteractionContent.trim());
      setNewInteractionContent('');
      setIsAdding(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'email':
        return (
          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        );
      case 'call':
        return (
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        );
      case 'meeting':
        return (
          <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  // Filter out notes (they're handled separately)
  const communications = interactions.filter(i => i.type !== 'note');

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Communication Log</h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Communication
        </button>
      </div>

      {/* Add Communication Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="interaction-type" className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                id="interaction-type"
                value={newInteractionType}
                onChange={(e) => setNewInteractionType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="email">Email</option>
                <option value="call">Phone Call</option>
                <option value="meeting">Meeting</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="interaction-content" className="block text-sm font-medium text-gray-700 mb-1">
              Details
            </label>
            <textarea
              id="interaction-content"
              rows={3}
              value={newInteractionContent}
              onChange={(e) => setNewInteractionContent(e.target.value)}
              placeholder="Enter communication details..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Communication
            </button>
          </div>
        </form>
      )}

      {/* Communication List */}
      {communications.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500">No communications recorded yet.</div>
        </div>
      ) : (
        <div className="space-y-4">
          {communications.map((communication) => (
            <div key={communication.id} className="border-l-4 border-blue-200 pl-4 py-2">
              <div className="flex items-center space-x-2 mb-1">
                {getInteractionIcon(communication.type)}
                <span className="text-sm font-medium text-gray-900 capitalize">
                  {communication.type}
                </span>
                <span className="text-sm text-gray-500">
                  {formatDate(communication.timestamp)}
                </span>
              </div>
              <p className="text-sm text-gray-700">{communication.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
