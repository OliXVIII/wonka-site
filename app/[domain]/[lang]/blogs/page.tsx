import { notFound, redirect } from "next/navigation";

import CreatePostButton from "@/components/post/create-post-button";
import Posts from "@/components/post/posts";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import CreateSiteButton from "@/components/sites/create-site-button";
import CreateSiteModal from "@/components/modal/create-site";
import { Locale, defaultLocale, localesDetails } from "@/types/languages";

export default async function SitePosts({
  params,
}: {
  params: { domain: string; lang: Locale; id: string };
}) {
  const session = await getSession();
  const admin =
    process.env.NODE_ENV === "development"
      ? true
      : session?.user?.role === "admin";
  const domain =
    process.env.NODE_ENV === "development" ? "local-108.com" : params.domain;
  const locale = localesDetails[params.lang] ?? defaultLocale;
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

  // const url =
  //   process.env.NODE_ENV === "development"
  //     ? "local-108.com"
  //     : process.env.NEXTAUTH_URL ?? "localhost:3000";

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="font-cal w-60 truncate text-xl font-bold dark:text-light sm:w-auto sm:text-3xl">
            All Posts for {domain}
          </h1>
        </div>
        {/* <CreateSiteButton>
          <CreateSiteModal />
        </CreateSiteButton> */}
        <CreatePostButton domain={domain} locale={locale} admin={admin} />
        <Posts />
      </div>
      {/* <Posts siteId={decodeURIComponent(params.id)} /> */}
    </>
  );
}
