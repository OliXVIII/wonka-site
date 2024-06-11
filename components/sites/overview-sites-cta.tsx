import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import CreateSiteButton from "./create-site-button";
import CreateSiteModal from "../modal/create-site";
import Link from "next/link";

export default async function OverviewSitesCTA() {
  const session = await getSession();
  if (!session) {
    return 0;
  }
  const sites = await prisma.site.count({
    where: {},
  });

  return sites > 0 ? (
    <Link
      href="/sites"
      className="rounded-lg border border-black bg-black px-4 py-1.5 text-sm font-medium text-light transition-all hover:bg-light hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-light dark:active:bg-stone-800"
    >
      View All Sites
    </Link>
  ) : (
    <CreateSiteButton>
      <CreateSiteModal />
    </CreateSiteButton>
  );
}
