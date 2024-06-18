"use server";

import { searchUserByEmail } from "@/server/admin-function/search-user-by-email";
import { setDoc, updateDoc } from "firebase/firestore";

export const setAdmin = async (domain: string, email: string, loggedInUserId: string) => {
    try {
      // User has admin role, fetch the user data

      const userDocRef = await searchUserByEmail(domain, email, loggedInUserId);
        if (userDocRef) {
            // Set the user as admin
            await updateDoc(userDocRef, {
                role: 'admin'
            });
            console.log('User role set as admin');
      } else {
        console.log('No matching documents found');
      }
    } catch (error) {
      console.error('Error searching user by email:', error);
    }
  };