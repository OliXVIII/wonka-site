"use server";

import { dbAdmin } from "@/lib/firebase-admin";
import { log } from "console";
import { QuerySnapshot } from "firebase-admin/firestore";
import { userExist } from "./user-exist";

interface User {
    UserId: string
    email: string;
    name: string;
}

export const AddUser = async (domain: string, email:string, userId:string, name:string): Promise<boolean> => {
  try {

    console.log('Add-user:', domain, userId);
    const exist = userExist(domain, userId);
    if (await exist) {
      console.log('User Exists!');
      return false;
    }
    else {
    console.log('User does not exist');
    const collectionRef = dbAdmin.collection(`domain/${domain}/users`);
    const userData = {
        userId,
        email,
        name,
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