"use client";

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

import Arrow from "@/public/profile/arrow-menu.svg";
import LogOut from "@/public/profile/log-out.svg";
import Setting from "@/public/profile/setting.svg";
import { StaticUiContent } from "@/types/static-ui-content";
import { UiContent } from "@/types/ui-content";

type ProfileItemProps = {
  uiContent: UiContent;
  staticUiContent: StaticUiContent;
};

export const ProfileItem = ({
  staticUiContent,
  uiContent,
}: ProfileItemProps) => {
  const menu = staticUiContent.profileMenu;
  const { data: session } = useSession();
  const admin = session?.user?.role === "admin";
  const year = new Date().getFullYear();
  return (
    <div className="flex flex-col whitespace-nowrap">
      <div className="flex w-72 items-center rounded-lg p-3 shadow-sm shadow-black dark:bg-dark">
        <div className="relative h-10 w-10">
          <Image
            fill
            src={session?.user?.image as string}
            alt="User Image"
            sizes="32px"
            className="rounded-lg"
          />
        </div>
        <span className="pl-3 font-bold">{session?.user?.name}</span>
      </div>
      {menu.length > 0
        ? menu.map((item) => {
            if (item.path === "/admin" && admin) {
              return (
                <div key={item.title} className="flex items-center pl-3 pt-7">
                  <Setting className="h-7 w-7" />
                  <span className="pl-3">{item.title}</span>
                  <Arrow className="absolute right-1 h-8 w-8 justify-end" />
                </div>
              );
            }

            if (item.path === "/logout") {
              return (
                <button
                  key={item.title}
                  onClick={() => signOut()}
                  className="my-3 flex h-10 w-full items-center rounded-md pl-3"
                >
                  <LogOut className="h-6 w-6" />
                  <span className="pl-3">{item.title}</span>
                </button>
              );
            }
            return null;
          })
        : null}
      <span className="mx-auto text-xs">Wonkasite © {year}</span>
    </div>
  );
};
