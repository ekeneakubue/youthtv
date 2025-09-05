'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminProtected from '../components/AdminProtected';
import AdminSidebar from '../components/AdminSidebar';

export default function VideoManagement() {
  const [selectedVideos, setSelectedVideos] = useState<number[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const videos = [
    {
      id: 1,
      title: 'The Future of AI Technology',
      channel: 'TechVision',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=120&fit=crop',
      duration: '15:42',
      views: '2.3M',
      likes: '45K',
      status: 'Published',
      uploadDate: '2024-01-15',
      category: 'Technology',
      size: '1.2 GB'
    },
    {
      id: 2,
      title: 'Cooking Masterclass: Italian Cuisine',
      channel: 'ChefMaster',
      thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=120&fit=crop',
      duration: '22:30',
      views: '945K',
      likes: '23K',
      status: 'Under Review',
      uploadDate: '2024-01-14',
      category: 'Food',
      size: '856 MB'
    },
    {
      id: 3,
      title: 'Travel Guide: Tokyo Adventures',
      channel: 'WanderlustTV',
      thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=200&h=120&fit=crop',
      duration: '18:15',
      views: '1.8M',
      likes: '67K',
      status: 'Published',
      uploadDate: '2024-01-13',
      category: 'Travel',
      size: '2.1 GB'
    },
    {
      id: 4,
      title: 'Fitness Workout: Full Body Training',
      channel: 'FitLife',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=120&fit=crop',
      duration: '12:45',
      views: '856K',
      likes: '19K',
      status: 'Draft',
      uploadDate: '2024-01-12',
      category: 'Fitness',
      size: '743 MB'
    },
    {
      id: 5,
      title: 'Music Production Tutorial',
      channel: 'BeatMakers',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=120&fit=crop',
      duration: '28:33',
      views: '432K',
      likes: '12K',
      status: 'Flagged',
      uploadDate: '2024-01-11',
      category: 'Music',
      size: '1.5 GB'
    },
  ];

  const handleSelectVideo = (videoId: number) => {
    setSelectedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const handleSelectAll = () => {
    setSelectedVideos(
      selectedVideos.length === videos.length 
        ? [] 
        : videos.map(video => video.id)
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      case 'Flagged':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredVideos = videos.filter(video => {
    const matchesStatus = filterStatus === 'all' || video.status.toLowerCase().replace(' ', '_') === filterStatus;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.channel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const sidebarItems = [
    { id: 'overview', name: 'Overview', icon: '📊', href: '/admin' },
    { id: 'videos', name: 'Video Management', icon: '🎥', href: '/admin/videos', permission: 'admin.videos.manage' },
    { id: 'users', name: 'User Management', icon: '👥', href: '/admin/users', permission: 'admin.users.manage' },
    { id: 'analytics', name: 'Analytics', icon: '📈', href: '/admin/analytics', permission: 'admin.analytics.view' },
    { id: 'moderation', name: 'Content Moderation', icon: '🛡️', href: '/admin/moderation', permission: 'admin.moderation.manage' },
    { id: 'settings', name: 'Settings', icon: '⚙️', href: '/admin/settings', permission: 'admin.settings.manage' },
  ];

  return (
    <AdminProtected requiredPermission="admin.videos.manage">
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <AdminSidebar items={sidebarItems} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-background border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Video Management</h2>
              <p className="text-muted-foreground">Manage all videos on the platform</p>
            </div>
            <Link
              href="/admin/videos/upload"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Upload Video</span>
            </Link>
          </div>
        </header>

        {/* Filters and Search */}
        <div className="p-6 border-b border-border bg-secondary/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="under_review">Under Review</option>
                <option value="draft">Draft</option>
                <option value="flagged">Flagged</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              {selectedVideos.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {selectedVideos.length} selected
                  </span>
                  <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors">
                    Delete Selected
                  </button>
                  <button className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm transition-colors">
                    Publish Selected
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Video List */}
        <div className="p-6">
          <div className="bg-secondary rounded-lg border border-border overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-border bg-accent/50">
              <div className="flex items-center">
                <div className="flex items-center space-x-4 flex-1">
                  <input
                    type="checkbox"
                    checked={selectedVideos.length === videos.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-border"
                  />
                  <span className="font-medium text-sm">Video</span>
                </div>
                <div className="hidden md:block w-24 text-sm font-medium">Views</div>
                <div className="hidden lg:block w-24 text-sm font-medium">Likes</div>
                <div className="w-32 text-sm font-medium">Status</div>
                <div className="w-32 text-sm font-medium">Actions</div>
              </div>
            </div>

            {/* Video Rows */}
            <div className="divide-y divide-border">
              {filteredVideos.map((video) => (
                <div key={video.id} className="px-6 py-4 hover:bg-accent/30 transition-colors">
                  <div className="flex items-center">
                    <div className="flex items-center space-x-4 flex-1">
                      <input
                        type="checkbox"
                        checked={selectedVideos.includes(video.id)}
                        onChange={() => handleSelectVideo(video.id)}
                        className="w-4 h-4 rounded border-border"
                      />
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-24 h-16 rounded object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium truncate">{video.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span>{video.channel}</span>
                          <span>{video.duration}</span>
                          <span>{video.category}</span>
                          <span>{video.size}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Uploaded: {video.uploadDate}
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block w-24 text-sm">{video.views}</div>
                    <div className="hidden lg:block w-24 text-sm">{video.likes}</div>
                    <div className="w-32">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(video.status)}`}>
                        {video.status}
                      </span>
                    </div>
                    <div className="w-32 flex items-center space-x-2">
                      <button className="p-1 hover:bg-accent rounded">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="p-1 hover:bg-accent rounded">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="p-1 hover:bg-accent rounded text-red-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
              Showing {filteredVideos.length} of {videos.length} videos
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 border border-border rounded-lg hover:bg-accent transition-colors disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-2 bg-primary text-primary-foreground rounded-lg">
                1
              </button>
              <button className="px-3 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                2
              </button>
              <button className="px-3 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
    </AdminProtected>
  );
}
