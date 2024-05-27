import Link from "next/link";
import dynamic from "next/dynamic";
import FooterMenu from "@/components/layout/footer/footer-menu";
import LogoSquare from "@/components/store/logo-square";
import { getMenu } from "@/lib/shopify";
import { Suspense } from "react";
import { UiContent } from "@/types/ui-content";
import { DataType } from "@/server/fetch-data";
import Image from "next/image";
import FooterSimple from "./footer-simple";
import ContactForm from "./contact-form";
import SocialMedia from "./social-media";
import FooterBottom from "./bottom-footer";
import Map from "./google-map-2";

// import FooterMap from "./footer-map";
const FooterMap = dynamic(() => import("./footer-map"));
type FooterProps = {
  data: DataType;
};

export default async function Footer({ data }: FooterProps) {
  const { uiContent, storage, features } = data;
  const skeleton =
    "w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700";
  const menu = await uiContent.footer.navigation;
  const midpoint = menu.length / 2;
  const firsthalfmenu = menu.slice(0, midpoint);
  const secondhalfmenu = menu.slice(midpoint);

  return (
    <footer className="relative mx-auto text-sm text-neutral-500 dark:text-neutral-400">
      <FooterSimple data={data} />
      {features.footer.type.map && <Map />}
      <SocialMedia />
      <FooterBottom {...uiContent} />
    </footer>
  );
}
