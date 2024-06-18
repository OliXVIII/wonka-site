"use server";

import { db } from "@/lib/firebase";
import { checkAdmin } from "../check-admin";
import { collection, doc, getDocs, query, where } from "firebase/firestore";

// Function to simulate fetching user data
export const searchUserByEmail = async (domain: string, email: string, loggedInUserId: string) => {
    try {
      // Check if the logged-in user has an admin role
      const admin = await checkAdmin(domain, loggedInUserId);
  
      // User has admin role, fetch the user data
      const collectionRef = collection(db, `domain/${domain}/users`);
      const emailQuery = query(collectionRef, where(`email`, '==', email));
      let emailSnap = await getDocs(emailQuery);
      if (!emailSnap.empty) {
          const documentId = emailSnap.docs[0].id;
          const docRef = doc(db, `domain/${domain}/users/${documentId}`)
          return docRef;
      } else {
        console.log('No matching documents found');
      }
    } catch (error) {
      console.error('Error searching user by email:', error);
    }
  };