import { notFound, redirect } from "next/navigation";

import CreatePostButton from "@/components/post/create-post-button";
import Posts from "@/components/post/posts";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function SitePosts({}) {
  const session = await getSession();
  // if (!session) {
  //   redirect("/login");
  // }
  // const data = await prisma.site.findUnique({
  //   where: {
  //     id: decodeURIComponent(params.id),
  //   },
  // });

  // if (!data) {
  //   notFound();
  // }

  const url = process.env.NEXTAUTH_URL ?? "localhost:3000";

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="font-cal w-60 truncate text-xl font-bold dark:text-light sm:w-auto sm:text-3xl">
            All Posts for {url}
          </h1>
        </div>
        <CreatePostButton domain={url} />
      </div>
      {/* <Posts siteId={decodeURIComponent(params.id)} /> */}
    </>
  );
}
