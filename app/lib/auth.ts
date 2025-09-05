import { cookies } from 'next/headers';
import { setSession, getSession as getStoredSession, deleteSession } from './session-store';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  avatar?: string;
  permissions: string[];
}

export interface AdminSession {
  user: User;
  token: string;
  expiresAt: Date;
}

// Mock user database - in production, this would be in your database
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@youthtv.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    permissions: [
      'admin.dashboard.view',
      'admin.users.manage',
      'admin.videos.manage',
      'admin.analytics.view',
      'admin.moderation.manage',
      'admin.settings.manage',
      'admin.system.manage'
    ]
  },
  {
    id: '2',
    name: 'Content Moderator',
    email: 'moderator@youthtv.com',
    role: 'moderator',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e0b9cd?w=100&h=100&fit=crop&crop=face',
    permissions: [
      'admin.dashboard.view',
      'admin.videos.view',
      'admin.videos.moderate',
      'admin.moderation.manage',
      'admin.users.view'
    ]
  }
];

// Sessions are now handled by the session-store module

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  // Mock authentication - in production, verify against database with hashed passwords
  const mockCredentials = {
    'admin@youthtv.com': 'admin123',
    'moderator@youthtv.com': 'mod123'
  };

  if (mockCredentials[email as keyof typeof mockCredentials] === password) {
    const user = mockUsers.find(u => u.email === email);
    return user || null;
  }

  return null;
}

export async function createSession(user: User): Promise<string> {
  const token = generateToken();
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  setSession(token, {
    userId: user.id,
    email: user.email,
    role: user.role,
    permissions: user.permissions,
    expiresAt
  });

  return token;
}

export async function getSession(token: string): Promise<AdminSession | null> {
  const sessionData = getStoredSession(token);
  
  if (!sessionData) {
    return null;
  }

  // Convert stored session back to AdminSession format
  const user: User = {
    id: sessionData.userId,
    name: mockUsers.find(u => u.id === sessionData.userId)?.name || '',
    email: sessionData.email,
    role: sessionData.role as 'admin' | 'moderator' | 'user',
    permissions: sessionData.permissions
  };

  return {
    user,
    token,
    expiresAt: new Date(sessionData.expiresAt)
  };
}

export async function destroySession(token: string): Promise<void> {
  deleteSession(token);
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return null;
    }

    const session = await getSession(token);
    return session?.user || null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export function hasPermission(user: User, permission: string): boolean {
  return user.permissions.includes(permission) || user.role === 'admin';
}

export function requirePermission(user: User, permission: string): void {
  if (!hasPermission(user, permission)) {
    throw new Error(`Access denied. Required permission: ${permission}`);
  }
}

function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
