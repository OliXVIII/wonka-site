"use client";

import { signIn, useSession } from "next-auth/react";
import Login from "@/public/login.svg";
import Image from "next/image";
import { MenuContent } from "@/types/ui-content";
import { LocaleDetails } from "@/types/languages";
import { ProfileModal } from "../layout/navbar/profile-menu/profile-modal";
import { handleLogin } from "../layout/navbar/profile-menu/handle-login";
import { useEffect, useState } from "react";

type LoginProps = {
  profileMenu?: MenuContent[];
  domain: string;
}

export const LoginButton = ({ domain, profileMenu}: LoginProps) => {
  const { data: session, status } = useSession(); // update session with role
  console.log("LoginButton: ", status);
  console.log("Session: ", session)
;  useEffect(() => {
    if (status === "authenticated") {
      handleLogin(domain, session);
    }
  }, [status, session, domain]);

  const initiateLogin = async () => {
    await signIn("google");
  };

  return (
    <div className="h-10 w-10">
      {session ? (
        profileMenu ? (
          <ProfileModal menu={profileMenu} domain={domain}/>
        ) : null
      ) : (
        <button onClick={initiateLogin}>
          <Login className="h-10 w-10 stroke-dark dark:stroke-light" />
        </button>
      )}
    </div>
  );
};