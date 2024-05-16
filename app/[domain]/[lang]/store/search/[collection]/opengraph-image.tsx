import LogoIcon from "@/components/icons/logo";
import { getCollection } from "@/lib/shopify";
import { ImageResponse } from "next/og";

export default async function Image({
  params,
}: {
  params: { domain: string; collection: string };
}) {
  const collection = await getCollection(params.collection);
  const title = collection?.seo?.title || collection?.title;

  return new ImageResponse(
    (
      <div className="flex h-full w-full flex-col items-center justify-center bg-black">
        <div className="flex h-[160px] w-[160px] flex-none items-center justify-center rounded-3xl border border-neutral-700">
          <LogoIcon width="64" height="58" fill="white" />
        </div>
        <p className="mt-12 text-6xl font-bold text-white">{title}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
