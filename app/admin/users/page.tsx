'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function UserManagement() {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      joinDate: '2024-01-15',
      lastActive: '2 hours ago',
      status: 'Active',
      role: 'Creator',
      videos: 12,
      subscribers: '1.2K',
      totalViews: '2.3M',
      verified: true,
      location: 'United States'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e0b9cd?w=100&h=100&fit=crop&crop=face',
      joinDate: '2024-01-14',
      lastActive: '1 day ago',
      status: 'Active',
      role: 'Creator',
      videos: 8,
      subscribers: '856',
      totalViews: '1.1M',
      verified: false,
      location: 'Canada'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      joinDate: '2024-01-13',
      lastActive: '3 days ago',
      status: 'Suspended',
      role: 'User',
      videos: 3,
      subscribers: '234',
      totalViews: '45K',
      verified: false,
      location: 'United Kingdom'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      joinDate: '2024-01-12',
      lastActive: '5 hours ago',
      status: 'Active',
      role: 'Creator',
      videos: 24,
      subscribers: '3.4K',
      totalViews: '8.9M',
      verified: true,
      location: 'Australia'
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      joinDate: '2024-01-11',
      lastActive: '1 week ago',
      status: 'Inactive',
      role: 'User',
      videos: 0,
      subscribers: '12',
      totalViews: '1.2K',
      verified: false,
      location: 'Germany'
    },
  ];

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === users.length 
        ? [] 
        : users.map(user => user.id)
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Suspended':
        return 'bg-red-100 text-red-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-purple-100 text-purple-800';
      case 'Creator':
        return 'bg-blue-100 text-blue-800';
      case 'User':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesStatus = filterStatus === 'all' || user.status.toLowerCase() === filterStatus;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const openUserModal = (user: any) => {
    setSelectedUser(user);
    setShowUserModal(true);
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
            <Link href="/admin/users" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-primary text-primary-foreground">
              <span className="text-lg">👥</span>
              <span className="font-medium">User Management</span>
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
              <h2 className="text-2xl font-bold">User Management</h2>
              <p className="text-muted-foreground">Manage all users on the platform</p>
            </div>
            <button
              onClick={() => openUserModal(null)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add User</span>
            </button>
          </div>
        </header>

        {/* Filters and Search */}
        <div className="p-6 border-b border-border bg-secondary/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
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
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              {selectedUsers.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {selectedUsers.length} selected
                  </span>
                  <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors">
                    Suspend Selected
                  </button>
                  <button className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm transition-colors">
                    Activate Selected
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User Stats */}
        <div className="p-6 border-b border-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-secondary rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">89,432</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-secondary rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold">76,234</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-secondary rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Creators</p>
                  <p className="text-2xl font-bold">12,456</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-secondary rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">New This Month</p>
                  <p className="text-2xl font-bold">2,341</p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User List */}
        <div className="p-6">
          <div className="bg-secondary rounded-lg border border-border overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-border bg-accent/50">
              <div className="flex items-center">
                <div className="flex items-center space-x-4 flex-1">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === users.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-border"
                  />
                  <span className="font-medium text-sm">User</span>
                </div>
                <div className="hidden md:block w-32 text-sm font-medium">Role</div>
                <div className="hidden lg:block w-24 text-sm font-medium">Videos</div>
                <div className="hidden lg:block w-32 text-sm font-medium">Subscribers</div>
                <div className="w-24 text-sm font-medium">Status</div>
                <div className="w-32 text-sm font-medium">Actions</div>
              </div>
            </div>

            {/* User Rows */}
            <div className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <div key={user.id} className="px-6 py-4 hover:bg-accent/30 transition-colors">
                  <div className="flex items-center">
                    <div className="flex items-center space-x-4 flex-1">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="w-4 h-4 rounded border-border"
                      />
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium truncate">{user.name}</h3>
                          {user.verified && (
                            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span className="truncate">{user.email}</span>
                          <span>•</span>
                          <span>{user.location}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Joined: {user.joinDate} • Last active: {user.lastActive}
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block w-32">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </div>
                    <div className="hidden lg:block w-24 text-sm">{user.videos}</div>
                    <div className="hidden lg:block w-32 text-sm">{user.subscribers}</div>
                    <div className="w-24">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </div>
                    <div className="w-32 flex items-center space-x-2">
                      <button 
                        onClick={() => openUserModal(user)}
                        className="p-1 hover:bg-accent rounded"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="p-1 hover:bg-accent rounded">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="p-1 hover:bg-accent rounded text-red-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
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
              Showing {filteredUsers.length} of {users.length} users
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

      {/* User Detail Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg border border-border w-full max-w-2xl mx-4 max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {selectedUser ? 'User Details' : 'Add New User'}
                </h3>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="p-2 hover:bg-accent rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {selectedUser ? (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedUser.avatar}
                      alt={selectedUser.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-xl font-semibold">{selectedUser.name}</h4>
                        {selectedUser.verified && (
                          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        )}
                      </div>
                      <p className="text-muted-foreground">{selectedUser.email}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedUser.status)}`}>
                          {selectedUser.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(selectedUser.role)}`}>
                          {selectedUser.role}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Videos</p>
                      <p className="text-2xl font-bold">{selectedUser.videos}</p>
                    </div>
                    <div className="bg-secondary rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Subscribers</p>
                      <p className="text-2xl font-bold">{selectedUser.subscribers}</p>
                    </div>
                    <div className="bg-secondary rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Total Views</p>
                      <p className="text-2xl font-bold">{selectedUser.totalViews}</p>
                    </div>
                    <div className="bg-secondary rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-lg font-semibold">{selectedUser.location}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Join Date</label>
                      <p className="text-sm text-muted-foreground">{selectedUser.joinDate}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Active</label>
                      <p className="text-sm text-muted-foreground">{selectedUser.lastActive}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end space-x-4 pt-4 border-t border-border">
                    <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors">
                      Suspend User
                    </button>
                    <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                      Delete User
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Enter user name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Role</label>
                    <select className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
                      <option value="user">User</option>
                      <option value="creator">Creator</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-end space-x-4 pt-4 border-t border-border">
                    <button
                      onClick={() => setShowUserModal(false)}
                      className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                    >
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors">
                      Create User
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
