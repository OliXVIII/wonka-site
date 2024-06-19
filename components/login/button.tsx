"use client";

import { signIn, useSession } from "next-auth/react";
import Login from "@/public/login.svg";
import Image from "next/image";
import { MenuContent } from "@/types/ui-content";
import { LocaleDetails } from "@/types/languages";
import { ProfileModal } from "../layout/navbar/profile-menu/profile-modal";
import { handleLogin } from "../layout/navbar/profile-menu/handle-login";

type LoginProps = {
  profileMenu: MenuContent[];
  locale: LocaleDetails;
  domain: string;
  admin?: boolean;
}

export const LoginButton = (
  { domain, profileMenu, locale, admin }: LoginProps
) => {
  const { data: session } = useSession();
  return (    <div className="h-10 w-10">
      {session ? 
      <ProfileModal menu={profileMenu} domain={domain} admin={admin}/>
      : 
      <button onClick={() => signIn('google')}>
        <Login className="h-10 w-10" />
      </button>}
    </div>
  );
};
