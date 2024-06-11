"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export const LoginButton = () => {
  const { data: session } = useSession();

  return (
    <>
    {session ? 
    null
    :
    <div className="relative z-50 h-10 w-10">
      <button onClick={() => signIn("google")}>
        <Image alt="login" src="/login.svg" fill />
      </button>
    </div>
    }
    </>
  );
};
