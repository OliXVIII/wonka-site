"use client";

import LogOut from "@/public/log-out.svg";
import Setting from "@/public/setting.svg";
import Arrow from "@/public/arrow-menu.svg";
// import { MenuContent } from "@/types/ui-content";
import { signOut, useSession } from "next-auth/react";
import { checkAdmin } from "@/server/admin-function/check-admin";
// import Image from "next/image";

// type ImageContent = {
//   image: string;
//   menu: MenuContent[];
// };

// type UserProps = {
//   userMenu: MenuContent[];
// };

type ProfileItemProps = {
  domain: string;
};

export const ProfileItem = ({ domain}: ProfileItemProps) => {
  const { data: session } = useSession();
  const admin = session?.user?.role === "admin";
  const year = new Date().getFullYear();
  return (
    <>
      <div className="flex pt-2 h-full min-h-48 min-w-80 w-full">
        <div className="mx-auto flex flex-col whitespace-nowrap">
          <div className="mb-4">
            <div className="flex items-center p-3 w-72 rounded-lg shadow-sm shadow-black dark:bg-dark-light bg-#ffffff">
              <button
              >
                <img
                src={session?.user?.image as string}
                alt="profile"
                className="h-10 w-10 rounded-full"
              />
              </button>
              

              <span className="pl-3">{session?.user?.name}</span>
            </div>
            {admin ? (
              <div className="flex items-center pt-5 pl-3">
                <Setting className="h-8 w-8" />
                <span className="pl-3">Admin</span>
                <Arrow className="h-8 w-8 justify-end" />
              </div>
            ) : null}
          </div>

          <div className="flex pl-3 pb-1 h-10 w-full mb-3 mt-32 rounded-md">
            <button
              onClick={() => signOut()}
              className="flex items-center font-bold"
            >
              <LogOut className="h-8 w-8" />
              <span className="pl-3">Sign Out</span>
            </button>
          </div>
          <span className="text-sm">Wonkasite © {year}</span>
        </div>
      </div>
    </>
  );
};
