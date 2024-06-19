"use client";

import { AddUser } from "@/server/admin-function/add-user";
import { signIn, useSession } from "next-auth/react";

export async function handleLogin(domain: string) {
    console.log('handleLogin:', domain )
    await signIn("google");
    const {data: session} = useSession();
    const userId = session?.user?.id as string;
    const email = session?.user?.email as string;
    const name = session?.user?.name as string;
    AddUser(domain, email, userId, name);

    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ userId, domain }),
    // });
    // console.log('Response:', response);
    // const data = await response.json();
    // if (response.ok) {
    //   console.log('Login successful:', data);
    // } else {
    //   console.error('Login failed:', data.error);
    // }
}