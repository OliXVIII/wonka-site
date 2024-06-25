"use client";

import { signIn, useSession } from "next-auth/react";
import Login from "@/public/login.svg";
import { MenuContent } from "@/types/ui-content";
import { ProfileModal } from "../layout/navbar/profile-menu/profile-modal";
import { handleLogin } from "../layout/navbar/profile-menu/handle-login";
import { useEffect } from "react";

type LoginProps = {
  profileMenu: MenuContent[];
  domain: string;
};

export const LoginButton = ({ domain, profileMenu }: LoginProps) => {
  const { data: session, status } = useSession();
  useEffect(() => {
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
        <ProfileModal menu={profileMenu} domain={domain} />
      ) : (
        <button onClick={initiateLogin}>
          <Login className="h-10 w-10 !fill-none" />
        </button>
      )}
    </div>
  );
};
