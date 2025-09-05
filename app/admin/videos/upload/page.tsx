'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

export default function VideoUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'technology',
    tags: '',
    visibility: 'public',
    thumbnail: null as File | null,
    video: null as File | null,
    monetization: false,
    comments: true,
    ageRestriction: false,
  });

  const categories = [
    { value: 'technology', label: 'Technology' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'education', label: 'Education' },
    { value: 'music', label: 'Music' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'sports', label: 'Sports' },
    { value: 'news', label: 'News & Politics' },
    { value: 'travel', label: 'Travel & Events' },
    { value: 'food', label: 'Food & Cooking' },
    { value: 'lifestyle', label: 'Lifestyle' },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        setFormData(prev => ({ ...prev, video: file }));
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('video/')) {
        setFormData(prev => ({ ...prev, video: file }));
      }
    }
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setFormData(prev => ({ ...prev, thumbnail: file }));
      }
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.video) {
      alert('Please select a video file');
      return;
    }
    simulateUpload();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
            <Link href="/admin/videos" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-primary text-primary-foreground">
              <span className="text-lg">🎥</span>
              <span className="font-medium">Video Management</span>
            </Link>
            <Link href="/admin/users" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent">
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
              <h2 className="text-2xl font-bold">Upload Video</h2>
              <p className="text-muted-foreground">Add new content to the platform</p>
            </div>
            <Link
              href="/admin/videos"
              className="text-muted-foreground hover:text-foreground flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Videos</span>
            </Link>
          </div>
        </header>

        {/* Upload Form */}
        <div className="p-6 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Video Upload Section */}
            <div className="bg-secondary rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold mb-4">Video File</h3>
              
              {!formData.video ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    dragActive
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <svg className="w-16 h-16 mx-auto text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-lg font-medium mb-2">Drag and drop your video here</p>
                  <p className="text-muted-foreground mb-4">or</p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Choose File
                  </button>
                  <p className="text-sm text-muted-foreground mt-4">
                    Supported formats: MP4, MOV, AVI, WMV (Max size: 10GB)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{formData.video.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(formData.video.size)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, video: null }))}
                      className="text-red-500 hover:text-red-600 p-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  {isUploading && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Uploading...</span>
                        <span>{Math.round(uploadProgress)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Video Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Details */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-secondary rounded-lg border border-border p-6">
                  <h3 className="text-lg font-semibold mb-4">Video Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title *</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter video title"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter video description"
                        rows={4}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Category *</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                          required
                        >
                          {categories.map(category => (
                            <option key={category.value} value={category.value}>
                              {category.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Visibility</label>
                        <select
                          value={formData.visibility}
                          onChange={(e) => setFormData(prev => ({ ...prev, visibility: e.target.value }))}
                          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="public">Public</option>
                          <option value="unlisted">Unlisted</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Tags</label>
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                        placeholder="Enter tags separated by commas"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Separate tags with commas (e.g., tech, tutorial, review)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Thumbnail & Settings */}
              <div className="space-y-6">
                {/* Thumbnail Upload */}
                <div className="bg-secondary rounded-lg border border-border p-6">
                  <h3 className="text-lg font-semibold mb-4">Thumbnail</h3>
                  
                  {!formData.thumbnail ? (
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <svg className="w-12 h-12 mx-auto text-muted-foreground mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm font-medium mb-2">Upload Thumbnail</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailSelect}
                        className="hidden"
                        id="thumbnail-upload"
                      />
                      <label
                        htmlFor="thumbnail-upload"
                        className="inline-block bg-accent hover:bg-accent/80 text-accent-foreground px-4 py-2 rounded text-sm cursor-pointer transition-colors"
                      >
                        Choose Image
                      </label>
                      <p className="text-xs text-muted-foreground mt-2">
                        JPG, PNG (Max 5MB)
                      </p>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(formData.thumbnail)}
                        alt="Thumbnail preview"
                        className="w-full aspect-video object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, thumbnail: null }))}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {/* Video Settings */}
                <div className="bg-secondary rounded-lg border border-border p-6">
                  <h3 className="text-lg font-semibold mb-4">Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable Monetization</p>
                        <p className="text-sm text-muted-foreground">Allow ads on this video</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.monetization}
                        onChange={(e) => setFormData(prev => ({ ...prev, monetization: e.target.checked }))}
                        className="w-4 h-4 rounded border-border"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Allow Comments</p>
                        <p className="text-sm text-muted-foreground">Users can comment on this video</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.comments}
                        onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.checked }))}
                        className="w-4 h-4 rounded border-border"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Age Restriction</p>
                        <p className="text-sm text-muted-foreground">Mark as 18+ content</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.ageRestriction}
                        onChange={(e) => setFormData(prev => ({ ...prev, ageRestriction: e.target.checked }))}
                        className="w-4 h-4 rounded border-border"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
              <Link
                href="/admin/videos"
                className="px-6 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                Cancel
              </Link>
              <button
                type="button"
                className="px-6 py-2 bg-secondary hover:bg-accent text-foreground border border-border rounded-lg transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                disabled={!formData.video || !formData.title || isUploading}
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading...' : 'Publish Video'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
