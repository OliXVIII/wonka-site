"use client";

import { signIn, useSession } from "next-auth/react";
import Login from "@/public/login.svg";
import Image from "next/image";
import { MenuContent } from "@/types/ui-content";
import { LocaleDetails } from "@/types/languages";
import { ProfileModal } from "../layout/navbar/profile-menu/profile-modal";
import { handleLogin } from "../layout/navbar/profile-menu/handle-login";
import { useEffect } from "react";

type LoginProps = {
  profileMenu?: MenuContent[];
  domain: string;
  admin?: boolean;
}

export const LoginButton = (
  { domain, profileMenu, admin }: LoginProps
) => {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
    handleLogin(domain, session);}
  }, [session, domain]);

  const initiateLogin = async () => {
    await signIn("google");
  };
  return (    <div className="h-10 w-10">
      {session ? (profileMenu ?
      <ProfileModal menu={profileMenu} domain={domain} admin={admin}/> : null)
      : 
      <button onClick={initiateLogin}>
        <Login className="h-10 w-10" />
      </button>}
    </div>
  );
};