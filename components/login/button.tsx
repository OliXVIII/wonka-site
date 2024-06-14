"use client";

import { signIn, useSession } from "next-auth/react";
import Login from "@/public/login.svg";
import Image from "next/image";
import { MenuContent } from "@/types/ui-content";
import { LocaleDetails } from "@/types/languages";
import { ProfileModal } from "../layout/navbar/profile-menu/profile-modal";

type LoginProps = {
  profileMenu: MenuContent[];
  locale: LocaleDetails;
}

export const LoginButton = (
  { profileMenu, locale }: LoginProps
) => {
  const { data: session } = useSession();
  console.log("Profile menu", profileMenu);
  return (
    <div className="h-10 w-10">
      {session ? 
      <ProfileModal menu={profileMenu}/>
      : 
      <button onClick={() => signIn("google")}>
        <Login className="h-10 w-10" />
      </button>}
    </div>
  );
};
