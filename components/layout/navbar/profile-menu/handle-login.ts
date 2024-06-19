"use client";

import { loginAction } from "@/server/login-action";
import { signIn, useSession } from "next-auth/react";

export async function handleLogin(domain: string) {
    console.log('handleLogin:', domain )
    signIn("google");
    console.log('handleLogin:', domain )
    const {data: session} = useSession();
    const userId = session?.user?.id as string;
    loginAction(userId, domain);

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