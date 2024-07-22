"use server";

import { dbAdmin } from "@/lib/firebase-admin";
import { DocumentData } from "firebase-admin/firestore";

export async function getUser(domain: string, userId: string): Promise<DocumentData | null> {
  
    try {
      const docRef = dbAdmin.doc(`domain/${domain}/users/${userId}`);
      const docSnapshot = await docRef.get();
      const userData = docSnapshot.data();
      if (userData) {
        return userData;
      } else {
        return null;
      }
    } catch (error) {
      console.error('get-user.ts Error getting user document:', error);
      return null;
    }
  }