import Link from "next/link";

import FooterMenu from "@/components/layout/footer/footer-menu";
import LogoSquare from "@/components/store/logo-square";
import { getMenu } from "@/lib/shopify";
import { Suspense } from "react";
import { UiContent } from "@/types/ui-content";
import { DataType } from "@/server/fetch-data";
import Image from "next/image";

type FooterProps = {
  data: DataType;
};

export default async function FooterSimple({ data }: FooterProps) {
  const { uiContent, storage } = data;
  //const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : "");
  const skeleton =
    "w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700";
  const menu = await uiContent.footer.navigation;
  const midpoint = menu.length / 2;
  const firsthalfmenu = menu.slice(0, midpoint);
  const secondhalfmenu = menu.slice(midpoint);

  return (
    <div className="max-sm:flex-grow flex  max-sm:flex-col md:justify-between py-5">
      <div className="flex max-sm:w-1/2 max-sm:justify-left border-t border-neutral-200 md:w-1/3">
        <Suspense
          fallback={
            <div className="m-auto flex gap-2">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div key={index} className="skeleton" />
              ))}
            </div>
          }
        >
          <FooterMenu menu={firsthalfmenu} />
        </Suspense>
      </div>
      {storage.logo?.logoTitle ? (
        <div className="flex max-sm:hidden md:w-1/3 md:pt-1">
          <Link href="/" className="relative my-auto h-[80%] max-h-40 w-full">
            <Image
              src={storage.logo.logoTitle.src}
              alt="logo"
              fill
              className="object-contain dark:invert-[90%]"
            />
          </Link>
        </div>
      ) : null}
      <div className="flex max-sm:w-1/2 max-sm:justify-right border-neutral-200 md:w-1/3 border-t">
        <Suspense
          fallback={
            <div className="m-auto flex gap-2">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div key={index} className="skeleton" />
              ))}
            </div>
          }
        >
          <FooterMenu menu={secondhalfmenu} />
        </Suspense>
      </div>
    </div>
  );
}
