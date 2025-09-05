import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple session validation for Edge Runtime
async function validateSession(token: string, request: NextRequest): Promise<{ valid: boolean; user?: any }> {
  try {
    // Make an internal API call to validate the session
    const baseUrl = new URL(request.url).origin;
    const response = await fetch(`${baseUrl}/api/admin/auth/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      const data = await response.json();
      return { valid: true, user: data.user };
    }
  } catch (error) {
    console.error('Session validation error:', error);
  }
  
  return { valid: false };
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect admin routes (excluding login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const { valid, user } = await validateSession(token, request);

    if (!valid || !user) {
      // Invalid or expired token
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_token');
      return response;
    }

    // Check if user has admin or moderator role
    if (user.role !== 'admin' && user.role !== 'moderator') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Check specific permissions for certain routes
    const permissionMap: Record<string, string> = {
      '/admin/users': 'admin.users.manage',
      '/admin/settings': 'admin.settings.manage',
      '/admin/analytics': 'admin.analytics.view',
      '/admin/moderation': 'admin.moderation.manage',
      '/admin/videos': 'admin.videos.manage',
    };

    const requiredPermission = permissionMap[pathname];
    if (requiredPermission) {
      const hasPermission = user.permissions.includes(requiredPermission) || user.role === 'admin';
      
      if (!hasPermission) {
        // Redirect to dashboard with access denied
        return NextResponse.redirect(new URL('/admin?error=access_denied', request.url));
      }
    }

    // Add user info to request headers for server components
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', user.id);
    requestHeaders.set('x-user-role', user.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Redirect to dashboard if already logged in and trying to access login
  if (pathname === '/admin/login') {
    const token = request.cookies.get('admin_token')?.value;
    
    if (token) {
      const { valid, user } = await validateSession(token, request);
      if (valid && user && (user.role === 'admin' || user.role === 'moderator')) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
