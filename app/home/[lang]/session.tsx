"use client";

import { signOut, useSession } from "next-auth/react";

export const Session = () => {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <>
          <img
            src={session.user?.image as string}
            className="h-20 w-20 rounded-full"
          ></img>
          <h1 className="text-3xl font-bold text-green-500">
            Welcome back, {session.user?.name}
          </h1>
          <p className="text-2xl font-semibold">{session.user?.email}</p>
          <button
            onClick={() => signOut()}
            className="rounded-lg border border-black bg-red-400 px-5 py-1"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-red-500">
            You're not logged in
          </h1>
          <div className="flex space-x-5">
          </div>
        </>
      )}
    </>
  );
};
