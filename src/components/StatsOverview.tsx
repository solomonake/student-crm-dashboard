'use client';

import { useState, useMemo } from 'react';
import { Student } from '@/types/student';

interface StatsOverviewProps {
  students: Student[];
}

export default function StatsOverview({ students }: StatsOverviewProps) {
  const [filterNotContacted, setFilterNotContacted] = useState(false);
  const [filterHighIntent, setFilterHighIntent] = useState(false);
  const [filterNeedsEssayHelp, setFilterNeedsEssayHelp] = useState(false);

  const stats = useMemo(() => {
    const totalStudents = students.length;
    
    const statusCounts = students.reduce((acc, student) => {
      acc[student.applicationStatus] = (acc[student.applicationStatus] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate students not contacted in 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const notContactedIn7Days = students.filter(student => 
      new Date(student.lastActive) < sevenDaysAgo
    ).length;

    return {
      total: totalStudents,
      exploring: statusCounts.exploring || 0,
      shortlisting: statusCounts.shortlisting || 0,
      applying: statusCounts.applying || 0,
      submitted: statusCounts.submitted || 0,
      notContactedIn7Days,
    };
  }, [students]);

  const filteredStudents = useMemo(() => {
    let filtered = students;
    
    if (filterNotContacted) {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      filtered = filtered.filter(student => 
        new Date(student.lastActive) < sevenDaysAgo
      );
    }
    
    if (filterHighIntent) {
      filtered = filtered.filter(student => 
        student.applicationStatus === 'applying' || student.applicationStatus === 'submitted'
      );
    }
    
    // Note: filterNeedsEssayHelp would require interaction data which we don't have in this component
    // This would be implemented when integrating with the full student data
    
    return filtered;
  }, [students, filterNotContacted, filterHighIntent, filterNeedsEssayHelp]);

  const StatCard = ({ title, value, color, icon }: { 
    title: string; 
    value: number; 
    color: string; 
    icon: React.ReactNode;
  }) => (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`p-3 rounded-md ${color}`}>
              {icon}
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="text-lg font-medium text-gray-900">
                {value}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Quick Filter */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Quick Filters</h3>
            <p className="text-sm text-gray-500">Filter students based on common criteria</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center">
              <input
                id="not-contacted-filter"
                type="checkbox"
                checked={filterNotContacted}
                onChange={(e) => setFilterNotContacted(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="not-contacted-filter" className="ml-2 block text-sm text-gray-900">
                Not contacted in 7 days
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="high-intent-filter"
                type="checkbox"
                checked={filterHighIntent}
                onChange={(e) => setFilterHighIntent(e.target.checked)}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="high-intent-filter" className="ml-2 block text-sm text-gray-900">
                High intent (Applying/Submitted)
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="essay-help-filter"
                type="checkbox"
                checked={filterNeedsEssayHelp}
                onChange={(e) => setFilterNeedsEssayHelp(e.target.checked)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="essay-help-filter" className="ml-2 block text-sm text-gray-900">
                Needs essay help
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Students"
          value={stats.total}
          color="bg-blue-500"
          icon={
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />

        <StatCard
          title="Exploring"
          value={stats.exploring}
          color="bg-blue-500"
          icon={
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
        />

        <StatCard
          title="Shortlisting"
          value={stats.shortlisting}
          color="bg-purple-500"
          icon={
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
        />

        <StatCard
          title="Applying"
          value={stats.applying}
          color="bg-orange-500"
          icon={
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />

        <StatCard
          title="Submitted"
          value={stats.submitted}
          color="bg-green-500"
          icon={
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* Alert for Not Contacted Students */}
      {stats.notContactedIn7Days > 0 && (
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-orange-700">
                <strong>{stats.notContactedIn7Days}</strong> students haven't been contacted in the last 7 days.
                {filterNotContacted && (
                  <span className="ml-2">
                    Showing filtered results below.
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filtered Results Summary */}
      {filterNotContacted && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Showing <strong>{filteredStudents.length}</strong> students who haven't been contacted in 7 days.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
