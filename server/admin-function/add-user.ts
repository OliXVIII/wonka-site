"use server";

import { dbAdmin } from "@/lib/firebase-admin";

export const addUser = async (domain: string, email:string, userId:string, name:string, imageURL:string): Promise<boolean> => {
  try {
    const collectionRef = dbAdmin.collection(`domain/${domain}/users`);
    
    const userData = {
        userId,
        email,
        name,
        imageURL,
        role: 'user',
    }
    await collectionRef.doc(userId).set(userData);
    return true;

  } catch (error) {
    return false;
  }
};