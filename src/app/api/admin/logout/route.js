import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

const COOKIE_NAME = 'auth_token';

export async function POST() {
  // Expire the cookie by setting maxAge to -1
  const serializedCookie = serialize(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1,
    path: '/',
  });

  return new NextResponse(JSON.stringify({ message: 'Logout successful' }), {
    status: 200,
    headers: { 'Set-Cookie': serializedCookie },
  });
} 