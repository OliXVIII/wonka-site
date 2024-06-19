"use client";

import { addUser } from "@/server/admin-function/add-user";
import { signIn, useSession } from "next-auth/react";

export const handleLogin = async (domain: string, session: any) => {
    try {
      console.log('Handle-login:', domain, session)
      if (session?.user) {
        const userId = session.user.id as string;
        const email = session.user.email as string;
        const name = session.user.name as string;
        const image = session.user.image as string;
  
        const result = await addUser(domain, email, userId, name, image);
        if (result) {
          console.log('User successfully added.');
        } else {
          console.log('User already exists or an error occurred.');
        }
      } else {
        throw new Error('Session user is undefined.');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };