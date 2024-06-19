'use server'; // Ensure server-side execution in Next.js 14

// Import necessary utilities from Next.js and Firebase
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import  { dbAdmin } from '@/lib/firebase-admin'; // Adjust the import path as necessary
import { checkAdmin } from './admin-function/check-admin';
import { searchUserByEmail } from './admin-function/search-user-by-email';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { userExist } from './admin-function/user-exist';

// Define the loginAction function
export async function loginAction(userId: string, domain: string) {
  // Get the authentication token req: NextRequest, 
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // console.log("login-action.ts: Token", token);
  // Check if the token is not present and return unauthorized if missing
  // if (!token) {
  //   return new NextResponse('Unauthorized', { status: 401 });
  // }

  const session = getServerSession(authOptions);

  // Access the Firestore database
  // const usersRef = dbAdmin.collection('users');

  // const userSnapshot = await searchUserByEmail(domain, session.req.user?.email, userId);

  // Check if the user already exists
  if (await userExist(domain, userId)) {

    // Verify special authorization levels
    console.log('UserId:', userId);
    if (await checkAdmin(domain, userId)) {
      // User has special authorization, return the user data
      return new NextResponse(JSON.stringify(userData), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    // User exists but does not have special authorization
    return new NextResponse('Access Denied', { status: 403 });
  } else {
    // User does not exist, create a new user entry
    await usersRef.doc(token.sub || '').set({
      email: token.email,
      name: token.name,
      role: 'client', // Assign a default authorization level
    });

    // Return the newly created user data
    return new NextResponse(JSON.stringify({
      email: token.email,
      name: token.name,
      role: 'client', // Assign a default role
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}