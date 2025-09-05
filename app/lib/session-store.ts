import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Simple file-based session store for development
// In production, this should be replaced with Redis or database storage

interface SessionData {
  userId: string;
  email: string;
  role: string;
  permissions: string[];
  expiresAt: number;
}

const SESSION_FILE = join(process.cwd(), '.sessions.json');

function loadSessions(): Record<string, SessionData> {
  try {
    if (existsSync(SESSION_FILE)) {
      const data = readFileSync(SESSION_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading sessions:', error);
  }
  return {};
}

function saveSessions(sessions: Record<string, SessionData>): void {
  try {
    writeFileSync(SESSION_FILE, JSON.stringify(sessions, null, 2));
  } catch (error) {
    console.error('Error saving sessions:', error);
  }
}

export function setSession(token: string, data: SessionData): void {
  const sessions = loadSessions();
  sessions[token] = data;
  saveSessions(sessions);
  console.log('Session stored:', { token, userId: data.userId, role: data.role });
  console.log('Total sessions:', Object.keys(sessions).length);
}

export function getSession(token: string): SessionData | null {
  const sessions = loadSessions();
  const session = sessions[token];
  
  if (!session) {
    console.log('Session not found for token:', token);
    console.log('Available sessions:', Object.keys(sessions));
    return null;
  }

  if (session.expiresAt < Date.now()) {
    console.log('Session expired, removing');
    delete sessions[token];
    saveSessions(sessions);
    return null;
  }

  console.log('Session found for user:', session.email);
  return session;
}

export function deleteSession(token: string): void {
  const sessions = loadSessions();
  delete sessions[token];
  saveSessions(sessions);
  console.log('Session deleted:', token);
}

export function clearAllSessions(): void {
  saveSessions({});
  console.log('All sessions cleared');
}
