"use client";

import { signOut, useSession } from "next-auth/react";
import { getUser } from "@/server/admin-function/get-user";
import Image from "next/image";

export const Session = () => {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <>
          <Image
            alt="User Image"
            src={session.user?.image as string}
            className="h-20 w-20 rounded-full"
            fill
          ></Image>
          <h1 className="text-3xl font-bold text-green-500">
            Welcome back, {session.user?.name}
          </h1>
          <h2 className="text-3xl font-bold text-blue-500">
            UserId: {session.user?.id}
          </h2>
          <p className="text-2xl font-semibold">{session.user?.email}</p>
          <button
            onClick={() => signOut()}
            className="rounded-lg border border-black bg-red-400 px-5 py-1"
          >
            Sign Out
          </button>
          <button
            onClick={() => getUser("local-108", "ncastonguay01@gmail.com")}
            className="rounded-lg border border-black bg-red-400 px-5 py-1"
          >
            Test
          </button>
          {/* <button
            onClick={() => addUser("local-108", 'test@gmail.com', "TEST ID", "Test User")}  
            className="rounded-lg border border-black bg-blue-400 px-5 py-1"
          >
            HAD UZER TWO DATA
          </button> */}
          <p>{session.user?.role}</p>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-red-500">
            {"You're not logged in"}
          </h1>

          <div className="flex space-x-5"></div>
        </>
      )}
    </>
  );
};
