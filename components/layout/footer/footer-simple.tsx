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
  const menu = await uiContent.footer.navigation;
  const midpoint = menu.length / 2;
  const firsthalfmenu = menu.slice(0, midpoint);
  const secondhalfmenu = menu.slice(midpoint);

  return (
    <div className="flex w-full py-5 max-sm:flex-grow max-sm:flex-wrap max-sm:min-h-52 max-sm:justify-center md:justify-between">
      <FooterMenu menu={firsthalfmenu} />
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
      <FooterMenu menu={secondhalfmenu} />
    </div>
  );
}
