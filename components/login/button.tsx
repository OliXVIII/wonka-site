"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <div className="relative z-50 h-12 w-12">
      <button onClick={() => signIn("google")}>
        <Image alt="login" src="/login.svg" fill />
      </button>
    </div>
  );
};
