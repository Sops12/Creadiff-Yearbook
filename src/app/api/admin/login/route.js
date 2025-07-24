import clientPromise from '@/lib/mongodb';
import { compare } from 'bcryptjs';
import { SignJWT } from 'jose';
import { serialize } from 'cookie';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const COOKIE_NAME = 'auth_token';

export async function POST(req) {
  const { username, password } = await req.json();
  if (!username || !password) {
    return new Response(JSON.stringify({ message: 'Missing credentials' }), { status: 400 });
  }
  try {
    const client = await clientPromise;
    const db = client.db('creadiff');
    const admin = await db.collection('admins').findOne({ username });
    if (!admin) {
      return new Response(JSON.stringify({ message: 'Invalid username or password' }), { status: 401 });
    }
    const valid = await compare(password, admin.password);
    if (!valid) {
      return new Response(JSON.stringify({ message: 'Invalid username or password' }), { status: 401 });
    }
    // Create JWT
    const token = await new SignJWT({ userId: admin._id, username: admin.username })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h') // Token expires in 1 hour
      .sign(JWT_SECRET);

    // Serialize cookie
    const serializedCookie = serialize(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    return new Response(JSON.stringify({ message: 'Login successful' }), {
      status: 200,
      headers: { 'Set-Cookie': serializedCookie },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
} 