'use client';

import { useState } from 'react';
import { Reminder } from '@/types/student';

interface RemindersSectionProps {
  reminders: Reminder[];
  onAddReminder: (title: string, date: Date) => void;
  onUpdateReminder: (reminderId: string, title: string, date: Date) => void;
  onDeleteReminder: (reminderId: string) => void;
  onToggleReminder: (reminderId: string) => void;
}

export default function RemindersSection({ 
  reminders, 
  onAddReminder, 
  onUpdateReminder, 
  onDeleteReminder,
  onToggleReminder 
}: RemindersSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newReminderTitle, setNewReminderTitle] = useState('');
  const [newReminderDate, setNewReminderDate] = useState('');
  const [editingReminderId, setEditingReminderId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingDate, setEditingDate] = useState('');

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReminderTitle.trim() && newReminderDate) {
      onAddReminder(newReminderTitle.trim(), new Date(newReminderDate));
      setNewReminderTitle('');
      setNewReminderDate('');
      setIsAdding(false);
    }
  };

  const handleStartEdit = (reminder: Reminder) => {
    setEditingReminderId(reminder.id);
    setEditingTitle(reminder.title);
    setEditingDate(reminder.date.toISOString().split('T')[0]);
  };

  const handleSaveEdit = (reminderId: string) => {
    if (editingTitle.trim() && editingDate) {
      onUpdateReminder(reminderId, editingTitle.trim(), new Date(editingDate));
      setEditingReminderId(null);
      setEditingTitle('');
      setEditingDate('');
    }
  };

  const handleCancelEdit = () => {
    setEditingReminderId(null);
    setEditingTitle('');
    setEditingDate('');
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isOverdue = (date: Date) => {
    return new Date(date) < new Date() && !reminders.find(r => r.date.getTime() === date.getTime())?.completed;
  };

  // Sort reminders by date (upcoming first, then overdue)
  const sortedReminders = [...reminders].sort((a, b) => {
    const now = new Date();
    const aOverdue = a.date < now && !a.completed;
    const bOverdue = b.date < now && !b.completed;
    
    if (aOverdue && !bOverdue) return -1;
    if (!aOverdue && bOverdue) return 1;
    
    return a.date.getTime() - b.date.getTime();
  });

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Reminders</h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Reminder
        </button>
      </div>

      {/* Add Reminder Form */}
      {isAdding && (
        <form onSubmit={handleAddReminder} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="reminder-title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                id="reminder-title"
                type="text"
                value={newReminderTitle}
                onChange={(e) => setNewReminderTitle(e.target.value)}
                placeholder="Enter reminder title..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="reminder-date" className="block text-sm font-medium text-gray-700 mb-1">
                Date & Time
              </label>
              <input
                id="reminder-date"
                type="datetime-local"
                value={newReminderDate}
                onChange={(e) => setNewReminderDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Reminder
            </button>
          </div>
        </form>
      )}

      {/* Reminders List */}
      {sortedReminders.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500">No reminders yet.</div>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedReminders.map((reminder) => {
            const overdue = isOverdue(reminder.date);
            const isEditing = editingReminderId === reminder.id;
            
            return (
              <div
                key={reminder.id}
                className={`border rounded-lg p-4 ${
                  reminder.completed
                    ? 'border-green-200 bg-green-50'
                    : overdue
                    ? 'border-red-200 bg-red-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={reminder.completed}
                      onChange={() => onToggleReminder(reminder.id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                          <input
                            type="datetime-local"
                            value={editingDate}
                            onChange={(e) => setEditingDate(e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>
                      ) : (
                        <div>
                          <p className={`text-sm font-medium ${
                            reminder.completed
                              ? 'text-green-700 line-through'
                              : overdue
                              ? 'text-red-700'
                              : 'text-gray-900'
                          }`}>
                            {reminder.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDateTime(reminder.date)}
                            {overdue && !reminder.completed && (
                              <span className="ml-2 text-red-600 font-medium">(Overdue)</span>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => handleSaveEdit(reminder.id)}
                          className="text-sm text-green-600 hover:text-green-800"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-sm text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleStartEdit(reminder)}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDeleteReminder(reminder.id)}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
