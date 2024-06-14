"use client";

import LogOut from "@/public/log-out.svg";
import Setting from "@/public/setting.svg";
import Arrow from "@/public/arrow-menu.svg";
import { MenuContent } from "@/types/ui-content";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

type ImageContent = {
  image: string;
  menu: MenuContent[];
};

type UserProps = {
  userMenu: MenuContent[];
};

const testImage: ImageProps = {};

export const ProfileItem = () => {
  const { data: session } = useSession();

  return (
    <>
      <div className="flex h-full w-full px-8 my-4">
          <div className="m-auto flex flex-col whitespace-nowrap">
            <div className="mb-4">
              <div className="flex items-center font-bold pb-3 border-b border-dark dark:border-light">
                <img
                  src={session?.user?.image as string}
                  alt="profile"
                  className="h-10 w-10 rounded-full"
                />
                <span className="pl-3">{session?.user?.name}</span>
              </div>
              <div className="flex items-center pt-3 ">
                <Setting className="h-8 w-8" />
                <span className="pl-3">Admin (optionnel)</span>
                <Arrow className="h-8 w-8 justify-end" />
              </div>
            </div>
          
          <div className="flex h-10 w-full rounded-md">
            <button
              onClick={() => signOut()}
              className="flex items-center font-bold"
            >
              <LogOut className="h-8 w-8" />
              <span className="pl-3">Sign Out</span>
            </button>
          </div></div>
      </div>
    </>
  );
};
