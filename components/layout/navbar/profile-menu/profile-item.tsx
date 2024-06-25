"use client";

import LogOut from "@/public/log-out.svg";
import Setting from "@/public/setting.svg";
import Arrow from "@/public/arrow-menu.svg";
import { signOut, useSession } from "next-auth/react";
import { MenuContent } from "@/types/ui-content";
import Image from "next/image";

type ProfileItemProps = {
  menu: MenuContent[];
};

export const ProfileItem = ({ menu }: ProfileItemProps) => {
  const { data: session } = useSession();
  const admin = session?.user?.role === "admin";
  const year = new Date().getFullYear();

  const adminMenu = menu.find(
    (item) => item.title === ("Administration" || "Admin"),
  );
  const signOutMenu = menu.find(
    (item) => item.title === ("Déconnexion" || "Sign Out"),
  );

  return (
    <div className="flex h-full w-full p-2.5">
      <div className="flex flex-col whitespace-nowrap">
        <div className="mb-4">
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
          {admin ? (
            <div className="relative flex items-center pl-3 pt-7">
              <Setting className="h-7 w-7" />
              <span className="pl-3">{adminMenu?.title}</span>
              <Arrow className="absolute right-1 h-8 w-8 justify-end" />
            </div>
          ) : null}
        </div>

        <div className="my-3 flex h-10 w-full rounded-md pl-3">
          <button onClick={() => signOut()} className="flex items-center">
            <LogOut className="h-6 w-6" />
            <span className="pl-3">{signOutMenu?.title}</span>
          </button>
        </div>
        <span className="mx-auto text-xs">Wonkasite © {year}</span>
      </div>
    </div>
  );
};
