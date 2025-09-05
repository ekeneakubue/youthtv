'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminSettings() {
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'YouthTV',
      siteDescription: 'The ultimate video streaming platform for youth',
      contactEmail: 'admin@youthtv.com',
      supportEmail: 'support@youthtv.com',
      maintenanceMode: false,
      registrationEnabled: true,
    },
    content: {
      maxVideoSize: '10',
      allowedVideoFormats: ['mp4', 'mov', 'avi', 'wmv'],
      maxVideoDuration: '120',
      autoModeration: true,
      requireApproval: false,
      enableComments: true,
      enableLikes: true,
      enableSharing: true,
    },
    monetization: {
      enableAds: true,
      adRevenueSplit: '70',
      minimumPayout: '100',
      payoutSchedule: 'monthly',
      enableSponsorship: true,
      enableMembership: true,
      membershipFee: '9.99',
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: '24',
      passwordMinLength: '8',
      requireStrongPassword: true,
      enableCaptcha: true,
      rateLimiting: true,
      ipBlocking: true,
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      moderationAlerts: true,
      systemAlerts: true,
      userReports: true,
    },
  });

  const sections = [
    { id: 'general', name: 'General Settings', icon: '⚙️' },
    { id: 'content', name: 'Content Management', icon: '📹' },
    { id: 'monetization', name: 'Monetization', icon: '💰' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
  ];

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Here you would typically save to your backend
    alert('Settings saved successfully!');
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Site Name</label>
        <input
          type="text"
          value={settings.general.siteName}
          onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Site Description</label>
        <textarea
          value={settings.general.siteDescription}
          onChange={(e) => updateSetting('general', 'siteDescription', e.target.value)}
          rows={3}
          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Contact Email</label>
          <input
            type="email"
            value={settings.general.contactEmail}
            onChange={(e) => updateSetting('general', 'contactEmail', e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Support Email</label>
          <input
            type="email"
            value={settings.general.supportEmail}
            onChange={(e) => updateSetting('general', 'supportEmail', e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
          <div>
            <h4 className="font-medium">Maintenance Mode</h4>
            <p className="text-sm text-muted-foreground">Temporarily disable public access to the site</p>
          </div>
          <input
            type="checkbox"
            checked={settings.general.maintenanceMode}
            onChange={(e) => updateSetting('general', 'maintenanceMode', e.target.checked)}
            className="w-4 h-4 rounded border-border"
          />
        </div>
        
        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
          <div>
            <h4 className="font-medium">User Registration</h4>
            <p className="text-sm text-muted-foreground">Allow new users to register accounts</p>
          </div>
          <input
            type="checkbox"
            checked={settings.general.registrationEnabled}
            onChange={(e) => updateSetting('general', 'registrationEnabled', e.target.checked)}
            className="w-4 h-4 rounded border-border"
          />
        </div>
      </div>
    </div>
  );

  const renderContentSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Max Video Size (GB)</label>
          <input
            type="number"
            value={settings.content.maxVideoSize}
            onChange={(e) => updateSetting('content', 'maxVideoSize', e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Max Duration (minutes)</label>
          <input
            type="number"
            value={settings.content.maxVideoDuration}
            onChange={(e) => updateSetting('content', 'maxVideoDuration', e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Allowed Video Formats</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {['mp4', 'mov', 'avi', 'wmv', 'flv', 'webm'].map((format) => (
            <label key={format} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.content.allowedVideoFormats.includes(format)}
                onChange={(e) => {
                  const formats = e.target.checked
                    ? [...settings.content.allowedVideoFormats, format]
                    : settings.content.allowedVideoFormats.filter(f => f !== format);
                  updateSetting('content', 'allowedVideoFormats', formats);
                }}
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-sm">{format.toUpperCase()}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
          <div>
            <h4 className="font-medium">Auto Moderation</h4>
            <p className="text-sm text-muted-foreground">Automatically scan content for violations</p>
          </div>
          <input
            type="checkbox"
            checked={settings.content.autoModeration}
            onChange={(e) => updateSetting('content', 'autoModeration', e.target.checked)}
            className="w-4 h-4 rounded border-border"
          />
        </div>
        
        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
          <div>
            <h4 className="font-medium">Require Approval</h4>
            <p className="text-sm text-muted-foreground">All content must be approved before publishing</p>
          </div>
          <input
            type="checkbox"
            checked={settings.content.requireApproval}
            onChange={(e) => updateSetting('content', 'requireApproval', e.target.checked)}
            className="w-4 h-4 rounded border-border"
          />
        </div>
        
        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
          <div>
            <h4 className="font-medium">Enable Comments</h4>
            <p className="text-sm text-muted-foreground">Allow users to comment on videos</p>
          </div>
          <input
            type="checkbox"
            checked={settings.content.enableComments}
            onChange={(e) => updateSetting('content', 'enableComments', e.target.checked)}
            className="w-4 h-4 rounded border-border"
          />
        </div>
      </div>
    </div>
  );

  const renderMonetizationSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
        <div>
          <h4 className="font-medium">Enable Advertisements</h4>
          <p className="text-sm text-muted-foreground">Show ads on videos to generate revenue</p>
        </div>
        <input
          type="checkbox"
          checked={settings.monetization.enableAds}
          onChange={(e) => updateSetting('monetization', 'enableAds', e.target.checked)}
          className="w-4 h-4 rounded border-border"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Creator Revenue Split (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={settings.monetization.adRevenueSplit}
            onChange={(e) => updateSetting('monetization', 'adRevenueSplit', e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Minimum Payout ($)</label>
          <input
            type="number"
            value={settings.monetization.minimumPayout}
            onChange={(e) => updateSetting('monetization', 'minimumPayout', e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Payout Schedule</label>
        <select
          value={settings.monetization.payoutSchedule}
          onChange={(e) => updateSetting('monetization', 'payoutSchedule', e.target.value)}
          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
        </select>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
          <div>
            <h4 className="font-medium">Enable Sponsorships</h4>
            <p className="text-sm text-muted-foreground">Allow creators to add sponsored content</p>
          </div>
          <input
            type="checkbox"
            checked={settings.monetization.enableSponsorship}
            onChange={(e) => updateSetting('monetization', 'enableSponsorship', e.target.checked)}
            className="w-4 h-4 rounded border-border"
          />
        </div>
        
        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
          <div>
            <h4 className="font-medium">Enable Memberships</h4>
            <p className="text-sm text-muted-foreground">Allow premium membership subscriptions</p>
          </div>
          <input
            type="checkbox"
            checked={settings.monetization.enableMembership}
            onChange={(e) => updateSetting('monetization', 'enableMembership', e.target.checked)}
            className="w-4 h-4 rounded border-border"
          />
        </div>
      </div>
      
      {settings.monetization.enableMembership && (
        <div>
          <label className="block text-sm font-medium mb-2">Monthly Membership Fee ($)</label>
          <input
            type="number"
            step="0.01"
            value={settings.monetization.membershipFee}
            onChange={(e) => updateSetting('monetization', 'membershipFee', e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      )}
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Session Timeout (hours)</label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => updateSetting('security', 'sessionTimeout', e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Password Min Length</label>
          <input
            type="number"
            min="6"
            max="32"
            value={settings.security.passwordMinLength}
            onChange={(e) => updateSetting('security', 'passwordMinLength', e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
          <div>
            <h4 className="font-medium">Two-Factor Authentication</h4>
            <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
          </div>
          <input
            type="checkbox"
            checked={settings.security.twoFactorAuth}
            onChange={(e) => updateSetting('security', 'twoFactorAuth', e.target.checked)}
            className="w-4 h-4 rounded border-border"
          />
        </div>
        
        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
          <div>
            <h4 className="font-medium">Strong Password Policy</h4>
            <p className="text-sm text-muted-foreground">Require complex passwords with special characters</p>
          </div>
          <input
            type="checkbox"
            checked={settings.security.requireStrongPassword}
            onChange={(e) => updateSetting('security', 'requireStrongPassword', e.target.checked)}
            className="w-4 h-4 rounded border-border"
          />
        </div>
        
        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
          <div>
            <h4 className="font-medium">Enable CAPTCHA</h4>
            <p className="text-sm text-muted-foreground">Add CAPTCHA verification for sensitive actions</p>
          </div>
          <input
            type="checkbox"
            checked={settings.security.enableCaptcha}
            onChange={(e) => updateSetting('security', 'enableCaptcha', e.target.checked)}
            className="w-4 h-4 rounded border-border"
          />
        </div>
        
        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
          <div>
            <h4 className="font-medium">Rate Limiting</h4>
            <p className="text-sm text-muted-foreground">Limit API requests to prevent abuse</p>
          </div>
          <input
            type="checkbox"
            checked={settings.security.rateLimiting}
            onChange={(e) => updateSetting('security', 'rateLimiting', e.target.checked)}
            className="w-4 h-4 rounded border-border"
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
          <div>
            <h4 className="font-medium">Email Notifications</h4>
            <p className="text-sm text-muted-foreground">Send notifications via email</p>
          </div>
          <input
            type="checkbox"
            checked={settings.notifications.emailNotifications}
            onChange={(e) => updateSetting('notifications', 'emailNotifications', e.target.checked)}
            className="w-4 h-4 rounded border-border"
          />
        </div>
        
        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
          <div>
            <h4 className="font-medium">Push Notifications</h4>
            <p className="text-sm text-muted-foreground">Send browser push notifications</p>
          </div>
          <input
            type="checkbox"
            checked={settings.notifications.pushNotifications}
            onChange={(e) => updateSetting('notifications', 'pushNotifications', e.target.checked)}
            className="w-4 h-4 rounded border-border"
          />
        </div>
        
        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
          <div>
            <h4 className="font-medium">SMS Notifications</h4>
            <p className="text-sm text-muted-foreground">Send critical alerts via SMS</p>
          </div>
          <input
            type="checkbox"
            checked={settings.notifications.smsNotifications}
            onChange={(e) => updateSetting('notifications', 'smsNotifications', e.target.checked)}
            className="w-4 h-4 rounded border-border"
          />
        </div>
      </div>
      
      <div className="border-t border-border pt-6">
        <h4 className="font-medium mb-4">Alert Types</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div>
              <h5 className="font-medium">Moderation Alerts</h5>
              <p className="text-sm text-muted-foreground">Content flagged for review</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.moderationAlerts}
              onChange={(e) => updateSetting('notifications', 'moderationAlerts', e.target.checked)}
              className="w-4 h-4 rounded border-border"
            />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div>
              <h5 className="font-medium">System Alerts</h5>
              <p className="text-sm text-muted-foreground">Server and system status updates</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.systemAlerts}
              onChange={(e) => updateSetting('notifications', 'systemAlerts', e.target.checked)}
              className="w-4 h-4 rounded border-border"
            />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div>
              <h5 className="font-medium">User Reports</h5>
              <p className="text-sm text-muted-foreground">User-submitted reports and complaints</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.userReports}
              onChange={(e) => updateSetting('notifications', 'userReports', e.target.checked)}
              className="w-4 h-4 rounded border-border"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'content':
        return renderContentSettings();
      case 'monetization':
        return renderMonetizationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotificationSettings();
      default:
        return renderGeneralSettings();
    }
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
            <Link href="/admin/moderation" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent">
              <span className="text-lg">🛡️</span>
              <span className="font-medium">Content Moderation</span>
            </Link>
            <Link href="/admin/settings" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-primary text-primary-foreground">
              <span className="text-lg">⚙️</span>
              <span className="font-medium">Settings</span>
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
              <h2 className="text-2xl font-bold">Platform Settings</h2>
              <p className="text-muted-foreground">Configure platform-wide settings and preferences</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSave}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Settings Navigation */}
          <nav className="w-64 p-6 border-r border-border">
            <div className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-medium">{section.name}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Settings Content */}
          <div className="flex-1 p-6">
            <div className="max-w-4xl">
              <div className="bg-secondary rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold mb-6">
                  {sections.find(s => s.id === activeSection)?.name}
                </h3>
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
