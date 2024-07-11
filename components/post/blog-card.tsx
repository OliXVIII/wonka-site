import { Post, Site } from "@prisma/client";
import { BarChart, ExternalLink } from "lucide-react";
import Link from "next/link";

import BlurImage from "@/components/blur-image";
import { placeholderBlurhash, random } from "@/lib/utils";
import { Locale } from "@/types/languages";

type BlogCardProps = {
  data: Post & { site: Site | null };
  draft: boolean;
  locale: Locale;
  domain: string;
};

export default function BlogCard({
  data,
  draft,
  locale,
  domain,
}: BlogCardProps) {
  const imageUrl =
    data.imageURL && data.imageURL.trim() !== ""
      ? data.imageURL
      : "/image-not-found.png";
  const path = draft
    ? `/${locale}/post/${data.id}`
    : `/${locale}/blog/${data.id}`;
  return (
    <div className="relative rounded-lg border border-stone-200 bg-dark-light shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <Link href={path} className="flex flex-col overflow-hidden rounded-lg">
        <div className="relative h-44 overflow-hidden">
          <BlurImage
            alt={data.title ?? "Card thumbnail"}
            width={500}
            height={400}
            className="h-full w-full object-cover"
            src={imageUrl}
            placeholder="blur"
            blurDataURL={placeholderBlurhash}
          />
          {draft ? (
            <span className="absolute bottom-2 right-2 rounded-md border border-stone-200 bg-light px-3 py-0.5 text-sm font-medium text-stone-600 shadow-md">
              Draft
            </span>
          ) : null}
        </div>
        <div className="border-t border-stone-200 p-4 dark:border-stone-700">
          <h3 className="font-cal my-0 truncate text-xl font-bold tracking-wide text-light dark:text-dark dark:text-white">
            {data.title}
          </h3>
          <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-light dark:text-stone-400">
            {data.description}
          </p>
        </div>
      </Link>
      <div className="absolute flex w-full px-4"></div>
    </div>
  );
}
