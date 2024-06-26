"use server";

import { dbAdmin } from "@/lib/firebase-admin";

export const verifyUserAdmin = async (domain: string, userId:string): Promise<boolean> => {
  try {

    const userDocRef = dbAdmin.doc(`domain/${domain}/users/${userId}`);
    const userDocSnap = await userDocRef.get();
    const userRole = userDocSnap.data()?.role;
    if (userRole === 'admin') {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};