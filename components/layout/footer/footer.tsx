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
import { SocialMediaComponent } from "./social-media";
import FooterBottom from "./footer-bottom";
import StaticGoogleMap from "./static-google-map";

// import FooterMap from "./footer-map";
const FooterMap = dynamic(() => import("./footer-map"));
type FooterProps = {
  data: DataType;
};

export default async function Footer({ data }: FooterProps) {
  const { uiContent, storage, features } = data;

  return (
    <footer className="relative mx-auto text-sm text-neutral-500 dark:text-neutral-400 max-md:border-t max-md:border-neutral-200">
      <FooterSimple data={data} />
      {features.footer.type.map && <StaticGoogleMap storage={storage} />}
      {storage.socialMedia && (
        <SocialMediaComponent socialMedia={storage.socialMedia} />
      )}
      <FooterBottom {...uiContent} />
    </footer>
  );
}
