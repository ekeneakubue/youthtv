'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AdminProtected from './components/AdminProtected';
import AdminSidebar from './components/AdminSidebar';

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const error = searchParams?.get('error');

  const sidebarItems = [
    { id: 'overview', name: 'Overview', icon: '📊', href: '/admin' },
    { id: 'videos', name: 'Video Management', icon: '🎥', href: '/admin/videos', permission: 'admin.videos.manage' },
    { id: 'users', name: 'User Management', icon: '👥', href: '/admin/users', permission: 'admin.users.manage' },
    { id: 'analytics', name: 'Analytics', icon: '📈', href: '/admin/analytics', permission: 'admin.analytics.view' },
    { id: 'moderation', name: 'Content Moderation', icon: '🛡️', href: '/admin/moderation', permission: 'admin.moderation.manage' },
    { id: 'settings', name: 'Settings', icon: '⚙️', href: '/admin/settings', permission: 'admin.settings.manage' },
  ];

  const stats = [
    { label: 'Total Videos', value: '12,847', change: '+12%', trend: 'up' },
    { label: 'Active Users', value: '89,432', change: '+8%', trend: 'up' },
    { label: 'Total Views', value: '2.4M', change: '+15%', trend: 'up' },
    { label: 'Revenue', value: '$45,678', change: '+23%', trend: 'up' },
  ];

  const recentVideos = [
    {
      id: 1,
      title: 'Tech Review: Latest iPhone',
      channel: 'TechReviewer',
      views: '125K',
      status: 'Published',
      uploadDate: '2 hours ago',
      thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&h=100&fit=crop'
    },
    {
      id: 2,
      title: 'Cooking Tutorial: Italian Pasta',
      channel: 'ChefMaster',
      views: '89K',
      status: 'Under Review',
      uploadDate: '4 hours ago',
      thumbnail: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=150&h=100&fit=crop'
    },
    {
      id: 3,
      title: 'Travel Vlog: Paris Adventure',
      channel: 'TravelBuddy',
      views: '67K',
      status: 'Published',
      uploadDate: '6 hours ago',
      thumbnail: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=150&h=100&fit=crop'
    },
  ];

  const recentUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      joinDate: '2024-01-15',
      status: 'Active',
      videos: 12,
      subscribers: '1.2K'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      joinDate: '2024-01-14',
      status: 'Active',
      videos: 8,
      subscribers: '856'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      joinDate: '2024-01-13',
      status: 'Suspended',
      videos: 3,
      subscribers: '234'
    },
  ];

  return (
    <AdminProtected>
      <div className="flex h-screen bg-background">
        {/* Access Denied Alert */}
        {error === 'access_denied' && (
          <div className="fixed top-4 right-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span className="text-sm">Access denied. Insufficient permissions.</span>
            </div>
          </div>
        )}

        {/* Sidebar */}
        <AdminSidebar items={sidebarItems} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-background border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Dashboard Overview</h2>
              <p className="text-muted-foreground">Welcome back, Admin</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-accent">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V7h5v10z" />
                </svg>
              </button>
              <button className="p-2 rounded-lg hover:bg-accent relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V7h5v10z" />
                </svg>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-secondary rounded-lg p-6 border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    <span>{stat.change}</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={stat.trend === 'up' ? 'M7 14l5-5 5 5z' : 'M7 10l5 5 5-5z'} />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Videos */}
            <div className="bg-secondary rounded-lg border border-border">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Recent Videos</h3>
                  <Link
                    href="/admin/videos"
                    className="text-sm text-primary hover:text-primary/80"
                  >
                    View All
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentVideos.map((video) => (
                    <div key={video.id} className="flex items-center space-x-4">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-16 h-12 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{video.title}</h4>
                        <p className="text-sm text-muted-foreground">{video.channel}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                          <span>{video.views} views</span>
                          <span>{video.uploadDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          video.status === 'Published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {video.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Users */}
            <div className="bg-secondary rounded-lg border border-border">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Recent Users</h3>
                  <Link
                    href="/admin/users"
                    className="text-sm text-primary hover:text-primary/80"
                  >
                    View All
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{user.name}</h4>
                        <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                          <span>{user.videos} videos</span>
                          <span>{user.subscribers} subscribers</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/admin/videos/upload"
                className="bg-primary hover:bg-primary/90 text-primary-foreground p-4 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="font-medium">Upload Video</span>
                </div>
              </Link>
              <Link
                href="/admin/users/create"
                className="bg-secondary hover:bg-accent text-foreground p-4 rounded-lg transition-colors border border-border"
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">Add User</span>
                </div>
              </Link>
              <Link
                href="/admin/moderation"
                className="bg-secondary hover:bg-accent text-foreground p-4 rounded-lg transition-colors border border-border"
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Review Content</span>
                </div>
              </Link>
              <Link
                href="/admin/analytics"
                className="bg-secondary hover:bg-accent text-foreground p-4 rounded-lg transition-colors border border-border"
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="font-medium">View Analytics</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
    </AdminProtected>
  );
}
