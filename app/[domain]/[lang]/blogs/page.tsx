import { notFound, redirect } from "next/navigation";

import CreatePostButton from "@/components/post/create-post-button";
import Posts from "@/components/post/posts";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import CreateSiteButton from "@/components/sites/create-site-button";
import CreateSiteModal from "@/components/modal/create-site";
import { Locale, defaultLocale, localesDetails } from "@/types/languages";

export default async function SiteBlogs({
  params,
}: {
  params: { domain: string; lang: Locale; id: string };
}) {
  const session = await getSession();
  const admin =
    process.env.NODE_ENV === "development"
      ? true
      : session?.user?.role === "admin";
  const domain = params.domain.replace(".wonkasite", "");
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
  console.log(domain, locale, admin, params);

  return (
    <>
      <div className="flex flex-col items-center space-y-4">
        {admin ? (
          <div className="flex w-full justify-end">
            <CreatePostButton domain={domain} locale={locale} admin={admin} />
          </div>
        ) : null}
        <div className="w-full">
          <Posts domain={domain} locale={params.lang} />
        </div>
      </div>
    </>
  );
}
