"use server";

import { dbAdmin } from "@/lib/firebase-admin";

interface User {
    UserId: string
    email: string;
    name: string;
    imageUrl: string
    role: string;
}

export const addUser = async (domain: string, email:string, userId:string, name:string, imageURL:string): Promise<boolean> => {
  try {
    const collectionRef = dbAdmin.collection(`domain/${domain}/users`);
    console.log('Add-user:', domain, userId);
    if (await collectionRef.doc(userId).get().then(doc => doc.exists)){
      return false;
    }
    else {
    console.log('User does not exist');
    
    const userData = {
        userId,
        email,
        name,
        imageURL,
        role: 'user',
    }
    await collectionRef.doc(userId).set(userData);
    console.log('User added');
    console.log(`User ${userId} added to domain ${domain}`);
    return true;

    }
  } catch (error) {
    console.error('An error occurred:', error);
    return false;
  }
};