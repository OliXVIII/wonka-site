"use client";

import va from "@vercel/analytics";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LocaleDetails } from "@/types/languages";
import LoadingDots from "@/components/icons/loading-dots";
import { generateId } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { addPost } from "@/server/admin-function/post/add-post";

type CreatePostProps = {
  domain: string;
  admin: boolean;
  locale: LocaleDetails;
};

export default function CreatePostButton({
  domain,
  locale,
  admin,
}: CreatePostProps) {
  // const domain = params.domain;
  // const locale = localesDetails[params.lang] ?? defaultLocale;
  // const [data] = await Promise.all([fetchData(domain, locale)]);

  // const uiContent = data?.uiContent;
  // const storage = data?.storage;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return admin ? (
    <button
      onClick={() =>
        startTransition(async () => {
          const id = await generateId();
          console.log("post that will be added", id, domain, locale.path);
          addPost({
            id: id.toString(),
            domain: domain,
            title: "",
            description: "",
            content: "",
            imageURL: "",
            locale: locale.path,
            user: "",
          });
          va.track("Created Post");
          router.refresh();
          router.push(`/${locale.path}/post/${id}`);
        })
      }
      className={cn(
        "flex h-8 w-36 items-center justify-center space-x-2 rounded-lg border text-sm transition-all focus:outline-none sm:h-9",
        isPending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700  dark:text-stone-300"
          : "border border-black bg-black text-light hover:bg-light  active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200  dark:hover:text-light",
      )}
      disabled={isPending}
    >
      {isPending ? <LoadingDots color="#808080" /> : <p>Create New Post</p>}
    </button>
  ) : null;
}
