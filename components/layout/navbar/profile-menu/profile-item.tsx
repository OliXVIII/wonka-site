"use client";

import LogOut from "@/public/log-out.svg";
import Setting from "@/public/setting.svg";
import Arrow from "@/public/arrow-menu.svg";
import { signOut, useSession } from "next-auth/react";
import { MenuContent } from "@/types/ui-content";

type ProfileItemProps = {
  menu: MenuContent[];
};

// icon trop gros
// cr centre gris pas sa margin
//enlever les width?

export const ProfileItem = ({ menu }: ProfileItemProps) => {
  const { data: session } = useSession();
  const admin = session?.user?.role === "admin";
  const year = new Date().getFullYear();

  const adminMenu = menu.find((item) => item.title === ("Administration" || "Admin"));
  const signOutMenu = menu.find((item) => item.title === ("Déconnexion" || "Sign Out"));

  return (
      <div className="flex h-full p-2.5 w-full">
        <div className="flex flex-col whitespace-nowrap">
          <div className="mb-4">
            <div className="flex items-center p-3 w-72 rounded-lg shadow-sm shadow-black dark:bg-dark">

                <img
                src={session?.user?.image as string}
                alt="profile"
                className="h-10 w-10 rounded-full"
              />
              

              <span className="pl-3 font-bold">{session?.user?.name}</span>
            </div>
            {admin ? (
              <div className="relative flex items-center pt-7 pl-3">
                <Setting className="h-7 w-7" />
                <span className="pl-3">{adminMenu?.title}</span>
                <Arrow className="absolute h-8 w-8 justify-end right-1" />
              </div>
            ) : null}
          </div>

          <div className="flex pl-3 pb-1 h-10 w-full mb-3 mt-32 rounded-md">
            <button
              onClick={() => signOut()}
              className="flex items-center"
            >
              <LogOut className="h-6 w-6" />
              <span className="pl-3">{signOutMenu?.title}</span>
            </button>
          </div>
          <span className="text-xs mx-auto">Wonkasite © {year}</span>
        </div>
      </div>
  );
};
