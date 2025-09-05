'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('views');

  const metrics = [
    { id: 'views', name: 'Views', value: '2.4M', change: '+15%', trend: 'up' },
    { id: 'watchTime', name: 'Watch Time', value: '145K hrs', change: '+8%', trend: 'up' },
    { id: 'subscribers', name: 'Subscribers', value: '89.4K', change: '+12%', trend: 'up' },
    { id: 'revenue', name: 'Revenue', value: '$45.6K', change: '+23%', trend: 'up' },
  ];

  const chartData = [
    { day: 'Mon', views: 320000, watchTime: 18000, subscribers: 1200, revenue: 5400 },
    { day: 'Tue', views: 280000, watchTime: 16500, subscribers: 980, revenue: 4800 },
    { day: 'Wed', views: 420000, watchTime: 24000, subscribers: 1560, revenue: 7200 },
    { day: 'Thu', views: 380000, watchTime: 21000, subscribers: 1340, revenue: 6500 },
    { day: 'Fri', views: 450000, watchTime: 26000, subscribers: 1780, revenue: 8100 },
    { day: 'Sat', views: 520000, watchTime: 29000, subscribers: 2100, revenue: 9300 },
    { day: 'Sun', views: 480000, watchTime: 27500, subscribers: 1920, revenue: 8700 },
  ];

  const topVideos = [
    {
      id: 1,
      title: 'The Future of AI Technology',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=100&fit=crop',
      views: '2.3M',
      watchTime: '45.2K hrs',
      revenue: '$12.4K',
      engagement: '8.9%'
    },
    {
      id: 2,
      title: 'Cooking Masterclass: Italian Cuisine',
      thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=100&fit=crop',
      views: '1.8M',
      watchTime: '38.7K hrs',
      revenue: '$9.8K',
      engagement: '7.2%'
    },
    {
      id: 3,
      title: 'Travel Guide: Tokyo Adventures',
      thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=150&h=100&fit=crop',
      views: '1.5M',
      watchTime: '32.1K hrs',
      revenue: '$8.1K',
      engagement: '6.8%'
    },
  ];

  const topCreators = [
    {
      id: 1,
      name: 'TechVision',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      subscribers: '1.2M',
      totalViews: '45.6M',
      revenue: '$23.4K',
      videos: 156
    },
    {
      id: 2,
      name: 'ChefMaster',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e0b9cd?w=50&h=50&fit=crop&crop=face',
      subscribers: '856K',
      totalViews: '32.1M',
      revenue: '$18.7K',
      videos: 89
    },
    {
      id: 3,
      name: 'WanderlustTV',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
      subscribers: '723K',
      totalViews: '28.9M',
      revenue: '$15.2K',
      videos: 67
    },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  const getMaxValue = () => {
    return Math.max(...chartData.map(d => d[selectedMetric as keyof typeof d] as number));
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
            <Link href="/admin/analytics" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-primary text-primary-foreground">
              <span className="text-lg">📈</span>
              <span className="font-medium">Analytics</span>
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
              <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
              <p className="text-muted-foreground">Detailed insights and performance metrics</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="1d">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
              </select>
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors">
                Export Report
              </button>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className={`bg-secondary rounded-lg p-6 border cursor-pointer transition-colors ${
                  selectedMetric === metric.id ? 'border-primary' : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedMetric(metric.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.name}</p>
                    <p className="text-2xl font-bold mt-1">{metric.value}</p>
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    <span>{metric.change}</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={metric.trend === 'up' ? 'M7 14l5-5 5 5z' : 'M7 10l5 5 5-5z'} />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Line Chart */}
            <div className="bg-secondary rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Performance Trends</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-sm text-muted-foreground capitalize">{selectedMetric}</span>
                </div>
              </div>
              <div className="h-64 relative">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={i}
                      x1="40"
                      y1={40 + i * 32}
                      x2="380"
                      y2={40 + i * 32}
                      stroke="currentColor"
                      strokeOpacity="0.1"
                      strokeWidth="1"
                    />
                  ))}
                  
                  {/* Chart line */}
                  <polyline
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={chartData.map((d, i) => {
                      const x = 40 + (i * 340) / (chartData.length - 1);
                      const value = d[selectedMetric as keyof typeof d] as number;
                      const y = 168 - (value / getMaxValue()) * 128;
                      return `${x},${y}`;
                    }).join(' ')}
                  />
                  
                  {/* Data points */}
                  {chartData.map((d, i) => {
                    const x = 40 + (i * 340) / (chartData.length - 1);
                    const value = d[selectedMetric as keyof typeof d] as number;
                    const y = 168 - (value / getMaxValue()) * 128;
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="var(--primary)"
                        className="hover:r-6 transition-all"
                      />
                    );
                  })}
                  
                  {/* X-axis labels */}
                  {chartData.map((d, i) => {
                    const x = 40 + (i * 340) / (chartData.length - 1);
                    return (
                      <text
                        key={i}
                        x={x}
                        y="190"
                        textAnchor="middle"
                        className="text-xs fill-current text-muted-foreground"
                      >
                        {d.day}
                      </text>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Pie Chart for Content Categories */}
            <div className="bg-secondary rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold mb-6">Content Distribution</h3>
              <div className="flex items-center justify-center h-64">
                <div className="relative">
                  <svg className="w-48 h-48" viewBox="0 0 200 200">
                    {/* Pie slices */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="20"
                      strokeDasharray="125.6 376.8"
                      strokeDashoffset="0"
                      transform="rotate(-90 100 100)"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="20"
                      strokeDasharray="94.2 376.8"
                      strokeDashoffset="-125.6"
                      transform="rotate(-90 100 100)"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="20"
                      strokeDasharray="62.8 376.8"
                      strokeDashoffset="-219.8"
                      transform="rotate(-90 100 100)"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="20"
                      strokeDasharray="94.2 376.8"
                      strokeDashoffset="-282.6"
                      transform="rotate(-90 100 100)"
                    />
                  </svg>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-sm">Technology (25%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Entertainment (20%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Education (15%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Others (40%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Performers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Videos */}
            <div className="bg-secondary rounded-lg border border-border">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-semibold">Top Performing Videos</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {topVideos.map((video, index) => (
                    <div key={video.id} className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                        <span className="text-sm font-bold text-primary">#{index + 1}</span>
                      </div>
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-16 h-12 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{video.title}</h4>
                        <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground mt-1">
                          <span>{video.views} views</span>
                          <span>{video.watchTime}</span>
                          <span>{video.revenue} revenue</span>
                          <span>{video.engagement} engagement</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Creators */}
            <div className="bg-secondary rounded-lg border border-border">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-semibold">Top Creators</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {topCreators.map((creator, index) => (
                    <div key={creator.id} className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                        <span className="text-sm font-bold text-primary">#{index + 1}</span>
                      </div>
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium">{creator.name}</h4>
                        <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground mt-1">
                          <span>{creator.subscribers} subscribers</span>
                          <span>{creator.totalViews} total views</span>
                          <span>{creator.revenue} revenue</span>
                          <span>{creator.videos} videos</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
