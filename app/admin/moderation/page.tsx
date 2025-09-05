'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContentModeration() {
  const [selectedTab, setSelectedTab] = useState('pending');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const pendingContent = [
    {
      id: 1,
      type: 'video',
      title: 'Controversial Political Discussion',
      creator: 'NewsDebate',
      thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200&h=120&fit=crop',
      uploadDate: '2024-01-15',
      duration: '18:45',
      flags: ['Political Content', 'Potentially Misleading'],
      flagCount: 12,
      severity: 'medium',
      description: 'Video contains political discussion that may be controversial'
    },
    {
      id: 2,
      type: 'video',
      title: 'Extreme Sports Challenge',
      creator: 'AdventureSeeker',
      thumbnail: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=120&fit=crop',
      uploadDate: '2024-01-14',
      duration: '12:30',
      flags: ['Dangerous Activity', 'Age Inappropriate'],
      flagCount: 8,
      severity: 'high',
      description: 'Video shows dangerous stunts without proper safety warnings'
    },
    {
      id: 3,
      type: 'comment',
      title: 'Offensive language in comments',
      creator: 'RandomUser123',
      content: 'This is a sample comment that contains inappropriate language...',
      videoTitle: 'Gaming Tutorial: Advanced Strategies',
      flags: ['Hate Speech', 'Harassment'],
      flagCount: 5,
      severity: 'high',
      description: 'Comment contains offensive language and personal attacks'
    },
    {
      id: 4,
      type: 'video',
      title: 'DIY Chemistry Experiments',
      creator: 'ScienceKid',
      thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=200&h=120&fit=crop',
      uploadDate: '2024-01-13',
      duration: '25:15',
      flags: ['Safety Concerns', 'Educational Content'],
      flagCount: 3,
      severity: 'low',
      description: 'Video shows chemistry experiments that might be unsafe for children'
    },
  ];

  const flaggedReasons = [
    'Spam or Misleading',
    'Hate Speech',
    'Harassment',
    'Violence',
    'Adult Content',
    'Copyright Infringement',
    'Dangerous Activity',
    'Misinformation',
    'Political Content',
    'Other'
  ];

  const moderationActions = [
    { id: 'approve', name: 'Approve', color: 'bg-green-500 hover:bg-green-600' },
    { id: 'reject', name: 'Reject', color: 'bg-red-500 hover:bg-red-600' },
    { id: 'flag', name: 'Flag for Review', color: 'bg-yellow-500 hover:bg-yellow-600' },
    { id: 'restrict', name: 'Age Restrict', color: 'bg-orange-500 hover:bg-orange-600' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSelectItem = (itemId: number) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === pendingContent.length 
        ? [] 
        : pendingContent.map(item => item.id)
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on items:`, selectedItems);
    setSelectedItems([]);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary border-r border-border">
        <div className="p-6 border-b border-border">
          <Link href="/admin" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold">YTV</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">YouthTV Admin</h1>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </Link>
        </div>
        <nav className="p-4">
          <div className="space-y-2">
            <Link href="/admin" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent">
              <span className="text-lg">📊</span>
              <span className="font-medium">Overview</span>
            </Link>
            <Link href="/admin/videos" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent">
              <span className="text-lg">🎥</span>
              <span className="font-medium">Video Management</span>
            </Link>
            <Link href="/admin/users" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent">
              <span className="text-lg">👥</span>
              <span className="font-medium">User Management</span>
            </Link>
            <Link href="/admin/analytics" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent">
              <span className="text-lg">📈</span>
              <span className="font-medium">Analytics</span>
            </Link>
            <Link href="/admin/moderation" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-primary text-primary-foreground">
              <span className="text-lg">🛡️</span>
              <span className="font-medium">Content Moderation</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-background border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Content Moderation</h2>
              <p className="text-muted-foreground">Review and moderate platform content</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-secondary px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">{pendingContent.length} items pending</span>
              </div>
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors">
                Moderation Settings
              </button>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="border-b border-border bg-secondary/30">
          <div className="px-6">
            <nav className="flex space-x-8">
              {[
                { id: 'pending', name: 'Pending Review', count: pendingContent.length },
                { id: 'approved', name: 'Approved', count: 156 },
                { id: 'rejected', name: 'Rejected', count: 23 },
                { id: 'flagged', name: 'Flagged', count: 8 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    selectedTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
                >
                  {tab.name}
                  <span className="ml-2 px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <div className="p-6 bg-accent/50 border-b border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedItems.length} items selected
              </span>
              <div className="flex items-center space-x-2">
                {moderationActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleBulkAction(action.id)}
                    className={`px-3 py-1 text-white rounded text-sm transition-colors ${action.color}`}
                  >
                    {action.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content List */}
        <div className="p-6">
          <div className="bg-secondary rounded-lg border border-border overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-border bg-accent/50">
              <div className="flex items-center">
                <div className="flex items-center space-x-4 flex-1">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === pendingContent.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-border"
                  />
                  <span className="font-medium text-sm">Content</span>
                </div>
                <div className="hidden md:block w-32 text-sm font-medium">Creator</div>
                <div className="hidden lg:block w-24 text-sm font-medium">Flags</div>
                <div className="w-24 text-sm font-medium">Severity</div>
                <div className="w-40 text-sm font-medium">Actions</div>
              </div>
            </div>

            {/* Content Rows */}
            <div className="divide-y divide-border">
              {pendingContent.map((item) => (
                <div key={item.id} className="px-6 py-4 hover:bg-accent/30 transition-colors">
                  <div className="flex items-center">
                    <div className="flex items-center space-x-4 flex-1">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                        className="w-4 h-4 rounded border-border"
                      />
                      
                      {item.type === 'video' ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-24 h-16 rounded object-cover"
                        />
                      ) : (
                        <div className="w-24 h-16 bg-accent rounded flex items-center justify-center">
                          <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                      )}
                      
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium truncate">{item.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.type === 'video' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {item.type}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-2">
                          {item.flags.map((flag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs"
                            >
                              {flag}
                            </span>
                          ))}
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-2">
                          <span>Uploaded: {item.uploadDate}</span>
                          {item.duration && <span>Duration: {item.duration}</span>}
                          {item.content && <span>Comment</span>}
                        </div>
                      </div>
                    </div>
                    
                    <div className="hidden md:block w-32 text-sm">{item.creator}</div>
                    <div className="hidden lg:block w-24 text-sm">{item.flagCount} flags</div>
                    <div className="w-24">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(item.severity)}`}>
                        {item.severity}
                      </span>
                    </div>
                    
                    <div className="w-40 flex items-center space-x-1">
                      <button className="p-1 hover:bg-accent rounded text-green-600" title="Approve">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button className="p-1 hover:bg-accent rounded text-red-600" title="Reject">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <button className="p-1 hover:bg-accent rounded text-yellow-600" title="Flag">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 2H21l-3 6 3 6h-8.5l-1-2H5a2 2 0 00-2 2zm9-13.5V9" />
                        </svg>
                      </button>
                      <button className="p-1 hover:bg-accent rounded" title="View Details">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Showing {pendingContent.length} of {pendingContent.length} items
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 border border-border rounded-lg hover:bg-accent transition-colors disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-2 bg-primary text-primary-foreground rounded-lg">
                1
              </button>
              <button className="px-3 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Moderation Stats */}
        <div className="p-6 border-t border-border bg-secondary/30">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">156</div>
              <div className="text-sm text-muted-foreground">Approved Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">23</div>
              <div className="text-sm text-muted-foreground">Rejected Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">8</div>
              <div className="text-sm text-muted-foreground">Flagged Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2.3h</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
