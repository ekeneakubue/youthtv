'use client';

import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('trending');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    { id: 'trending', name: 'Trending', icon: '🔥' },
    { id: 'movies', name: 'Movies', icon: '🎬' },
    { id: 'series', name: 'TV Series', icon: '📺' },
    { id: 'music', name: 'Music', icon: '🎵' },
    { id: 'gaming', name: 'Gaming', icon: '🎮' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'news', name: 'News', icon: '📰' },
    { id: 'education', name: 'Education', icon: '📚' },
  ];

  const featuredVideos = [
    {
      id: 1,
      title: "The Future of Technology",
      description: "Exploring the latest innovations in AI and machine learning",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=450&fit=crop",
      duration: "15:42",
      views: "2.3M",
      channel: "TechVision",
      category: "Technology"
    },
    {
      id: 2,
      title: "Epic Adventure Documentary",
      description: "Journey through the world's most breathtaking landscapes",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop",
      duration: "28:15",
      views: "1.8M",
      channel: "NatureFilms",
      category: "Documentary"
    },
    {
      id: 3,
      title: "Cooking Masterclass",
      description: "Learn professional cooking techniques from world-class chefs",
      thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=450&fit=crop",
      duration: "22:30",
      views: "945K",
      channel: "ChefMaster",
      category: "Food"
    }
  ];

  const trendingVideos = [
    {
      id: 4,
      title: "Morning Workout Routine",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop",
      duration: "12:45",
      views: "856K",
      channel: "FitLife",
      uploadTime: "2 hours ago"
    },
    {
      id: 5,
      title: "JavaScript Tips & Tricks",
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=225&fit=crop",
      duration: "18:22",
      views: "1.2M",
      channel: "CodeAcademy",
      uploadTime: "5 hours ago"
    },
    {
      id: 6,
      title: "Travel Vlog: Tokyo",
      thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=225&fit=crop",
      duration: "25:10",
      views: "723K",
      channel: "WanderlustTV",
      uploadTime: "1 day ago"
    },
    {
      id: 7,
      title: "Guitar Tutorial: Beginner",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop",
      duration: "16:33",
      views: "445K",
      channel: "MusicLessons",
      uploadTime: "2 days ago"
    },
    {
      id: 8,
      title: "Space Exploration 2024",
      thumbnail: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=225&fit=crop",
      duration: "31:45",
      views: "2.1M",
      channel: "SpaceNews",
      uploadTime: "3 days ago"
    },
    {
      id: 9,
      title: "Art Speed Painting",
      thumbnail: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=225&fit=crop",
      duration: "8:15",
      views: "312K",
      channel: "ArtStudio",
      uploadTime: "4 days ago"
    },
    {
      id: 10,
      title: "Crypto Market Analysis",
      thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=225&fit=crop",
      duration: "20:18",
      views: "987K",
      channel: "CryptoInsights",
      uploadTime: "5 days ago"
    },
    {
      id: 11,
      title: "Home Garden Tips",
      thumbnail: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=225&fit=crop",
      duration: "14:27",
      views: "234K",
      channel: "GreenThumb",
      uploadTime: "1 week ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-accent"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">YTV</span>
              </div>
              <span className="text-xl font-bold hidden sm:block">YouthTV</span>
              <span className="text-lg font-bold sm:hidden">YTV</span>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search videos, channels, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-input border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Mobile Search Button */}
              <button className="md:hidden p-2 rounded-full hover:bg-accent">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              <button className="hidden md:block p-2 rounded-full hover:bg-accent">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V7h5v10z" />
                </svg>
              </button>
              <button className="hidden md:block p-2 rounded-full hover:bg-accent">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V7h5v10z" />
                </svg>
              </button>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer">
                <span className="text-white font-semibold text-sm">U</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-input border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm">
          <div className="p-4 mt-16">
            <nav className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="font-medium text-lg">{category.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar - Hidden on mobile */}
        <aside className="hidden lg:block w-64 min-h-screen bg-secondary border-r border-border p-4 sticky top-16">
          <nav className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-border">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">SUBSCRIPTIONS</h3>
            <div className="space-y-3">
              {['TechVision', 'NatureFilms', 'ChefMaster', 'FitLife'].map((channel) => (
                <div key={channel} className="flex items-center space-x-3 cursor-pointer hover:bg-accent p-2 rounded">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">{channel}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          {/* Hero Section */}
          <section className="mb-8">
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-purple-900 to-blue-900">
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="relative z-10 p-8 md:p-12">
                <div className="max-w-2xl">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Discover Amazing Content
                  </h1>
                  <p className="text-xl text-gray-300 mb-6">
                    Stream the latest videos, movies, and shows. Join millions of viewers on YouthTV.
                  </p>
                  <div className="flex space-x-4">
                    <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors">
                      Start Watching
                    </button>
                    <button className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Videos */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Featured Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVideos.map((video) => (
                <div key={video.id} className="group cursor-pointer">
                  <div className="relative rounded-lg overflow-hidden mb-3">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                      {video.duration}
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{video.channel}</span>
                    <span>{video.views} views</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Trending Videos Grid */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {trendingVideos.map((video) => (
                <div key={video.id} className="group cursor-pointer">
                  <div className="relative rounded-lg overflow-hidden mb-3">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                      {video.duration}
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-medium text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>{video.channel}</div>
                    <div className="flex items-center justify-between">
                      <span>{video.views} views</span>
                      <span>{video.uploadTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
