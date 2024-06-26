"use client";

import { signIn, useSession } from "next-auth/react";
import Login from "@/public/login.svg";
import { UiContent } from "@/types/ui-content";
import { ProfileModal } from "../layout/navbar/profile-menu/profile-modal";
import { handleLogin } from "../layout/navbar/profile-menu/handle-login";
import { useEffect } from "react";

type LoginProps = {
  uiContent: UiContent
  domain: string
};

export const LoginButton = ({ uiContent, domain }: LoginProps) => {
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
    <>
      {session ? (
         <ProfileModal uiContent={uiContent} domain={domain} />
       ) : (
         <button onClick={initiateLogin} className="h-10 w-10">
          <Login className="h-10 w-10 !fill-none" />
         </button>
       )}
    </>
  );
};
