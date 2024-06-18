"use client";

import { signIn, useSession } from "next-auth/react";

export async function handleLogin(domain: string) {
    signIn("google");
    const {data: session} = useSession();
    const userId = session?.user?.id as string;
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, domain }),
    });
  
    const data = await response.json();
    if (response.ok) {
      console.log('Login successful:', data);
    } else {
      console.error('Login failed:', data.error);
    }
  }