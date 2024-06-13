"use client";

import { signIn, useSession } from "next-auth/react";
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
    <>
    <div className="relative z-50 h-10 w-10">
      {session ? 
      <ProfileModal menu={profileMenu} locale={locale}/>
      : 
      <button onClick={() => signIn("google")}>
        <Image alt="login" src="/login.svg" fill />
      </button>}
    </div>
    </>
  );
};
