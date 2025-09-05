import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { destroySession } from '@/app/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (token) {
      await destroySession(token);
    }

    cookieStore.delete('admin_token');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
