"use client";

import { addUser } from "@/server/admin-function/add-user";

export const handleLogin = async (domain: string, session: any) => {
    try {
      if (session?.user) {
        const userId = session.user.id as string;
        const email = session.user.email as string;
        const name = session.user.name as string;
        const image = session.user.image as string;
  
        const result = await addUser(domain, email, userId, name, image);

      }
    } catch (error) {
      // Handle the error here
    }}
