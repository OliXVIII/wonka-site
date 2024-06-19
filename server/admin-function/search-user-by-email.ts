"use server";

import { dbAdmin } from "@/lib/firebase-admin";
import { checkAdmin } from "./check-admin";
import { DocumentData, QuerySnapshot } from 'firebase-admin/firestore';

// Function to simulate fetching user data
export const searchUserByEmail = async (domain: string, email: string, loggedInUserId: string): Promise<DocumentData | null> => {
  try {

    console.log('searchUserByEmail:', domain, email, loggedInUserId)
    // Check if the logged-in user has an admin role
    const adminRole = await checkAdmin(domain, loggedInUserId);

    if (adminRole) {
      // User has admin role, fetch the user data
      const collectionRef = dbAdmin.collection(`domain/${domain}/users`);
      const emailQuery = collectionRef.where('email', '==', email);
      const emailSnap: QuerySnapshot = await emailQuery.get();

      if (!emailSnap.empty) {
        const userData = emailSnap.docs[0].data();
        return {
          id: emailSnap.docs[0].id,
          ...userData,
        };
      } else {
        console.log('No matching documents found');
        return null;
      }
    } else {
      console.log('User does not have admin role');
      return null;
    }
  } catch (error) {
    console.error('Error searching user by email:', error);
    return null;
  }
};