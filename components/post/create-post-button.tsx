import va from "@vercel/analytics";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { Locale, defaultLocale, localesDetails } from "@/types/languages";
import LoadingDots from "@/components/icons/loading-dots";
import { createPost } from "@/lib/actions";
import { cn } from "@/lib/utils";

type CreatePostProps = {
  domain: string;
  admin: boolean;
};

export default function CreatePostButton({ domain, admin }: CreatePostProps) {
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
          const post = await createPost(null, domain, null);
          va.track("Created Post");
          router.refresh();
          router.push(`/post/${post.id}`);
        })
      }
      className={cn(
        "flex h-8 w-36 items-center justify-center space-x-2 rounded-lg border text-sm transition-all focus:outline-none sm:h-9",
        isPending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border border-black bg-black text-light hover:bg-light hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-light dark:active:bg-stone-800",
      )}
      disabled={isPending}
    >
      {isPending ? <LoadingDots color="#808080" /> : <p>Create New Post</p>}
    </button>
  ) : null;
}
