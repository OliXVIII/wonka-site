import Link from "next/link";
import dynamic from 'next/dynamic'
import FooterMenu from "@/components/layout/footer/footer-menu";
import LogoSquare from "@/components/store/logo-square";
import { getMenu } from "@/lib/shopify";
import { Suspense } from "react";
import { UiContent } from "@/types/ui-content";
import { DataType } from "@/server/fetch-data";
import Image from "next/image";
import FooterSimple from "./footer-simple";
// import FooterMap from "./footer-map";
const FooterMap = dynamic(() => import('./footer-map'))
type FooterProps = {
  data: DataType;
};

export default async function Footer({ data }: FooterProps) {
  const { uiContent, storage } = data;
  const currentYear = new Date().getFullYear();
  //const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : "");
  const skeleton =
    "w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700";
  const menu = await uiContent.footer.navigation;
  const midpoint = menu.length / 2;
  const firsthalfmenu = menu.slice(0, midpoint);
  const secondhalfmenu = menu.slice(midpoint);
  const copyrightName =
    "@ " + currentYear.toString() + " " + uiContent.footer.legal;

  return (
    <footer className="relative mx-auto text-sm text-neutral-500 dark:text-neutral-400">
      <FooterSimple data={data} />
      {uiContent.footer.type.map && <FooterMap />}
      <div className="border-t border-neutral-200 py-10 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>{copyrightName}</p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
          <p>{uiContent.footer.design}</p>
          <p className="md:ml-auto">
            {uiContent.footer.crafted}{" "}
            <a
              href="https://wonkasite.com"
              className="relative text-black dark:text-white"
            >
              Wonkasite
              <span className="absolute right-[60px] top-1/2 -translate-y-1/2 transform"></span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
