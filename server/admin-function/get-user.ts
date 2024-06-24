"use server";

import { dbAdmin } from "@/lib/firebase-admin";
import { DocumentData } from "firebase-admin/firestore";

export async function getUser(domain: string, userId: string): Promise<DocumentData | null> {
    console.log("Starting getUser");
  
    try {
      const docRef = dbAdmin.doc(`domain/${domain}/users/${userId}`);
      const docSnapshot = await docRef.get();
      const userData = docSnapshot.data();
      if (userData) {
        return userData;
      } else {
        console.log('No such user document!');
        return null;
      }
    } catch (error) {
      console.error('Error getting user document:', error);
      return null;
    }
  }