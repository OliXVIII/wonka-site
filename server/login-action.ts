'use server'; // Ensure server-side execution in Next.js 14

// Import necessary utilities from Next.js and Firebase
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import  { dbAdmin } from '@/lib/firebase-admin'; // Adjust the import path as necessary
import { checkAdmin } from './check-admin';
import { searchUserByEmail } from './admin-function/search-user-by-email';

// Define the loginAction function
export async function loginAction(req: NextRequest, userId: string, domain: string) {
  // Get the authentication token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Check if the token is not present and return unauthorized if missing
  if (!token) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // Access the Firestore database
  const usersRef = dbAdmin.collection('users');
  console.log(usersRef);

  const userSnapshot = await usersRef.doc(token.sub || '').get();

  // Check if the user already exists
  if (userSnapshot.exists) {
    const userData = userSnapshot.data() ?? {};

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