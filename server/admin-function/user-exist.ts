"use server";

import { dbAdmin } from "@/lib/firebase-admin";
import { log } from "console";

export const userExist = async (domain: string, UserId:string): Promise<boolean> => {
  try {

    console.log('checkuserExist:', domain, UserId);

    // Check if the logged-in user exists
    const userDocRef = dbAdmin.doc(`domain/${domain}/users/${UserId}`);
    const userDocSnap = await userDocRef.get();
    const userRole = userDocSnap.data()?.role;
    if (userRole) {
      console.log('User Exists!');
      return true;
    }
    console.log('User does not exist');
    return false;
  } catch (error) {
    console.error('An error occurred:', error);
    return false;
  }
};