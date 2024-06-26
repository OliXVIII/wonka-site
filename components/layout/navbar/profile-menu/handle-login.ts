"use client";

import { addUser } from "@/server/admin-function/add-user";

export const handleLogin = async (domain: string, session: any) => {
    try {
      if (session?.user) {
        const userId = session.user.id;
        const email = session.user.email;
        const name = session.user.name;
        const image = session.user.image;
        if (userId && email && name && image) {
        await addUser(domain, email, userId, name, image);
        }
      }
    } catch (error) {
      // Handle the error here
    }}
