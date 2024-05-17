import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import CTA from "@/components/cta";
import ReportAbuse from "@/components/report-abuse";
import { notFound, redirect } from "next/navigation";
import { getSiteData } from "@/lib/fetchers";
import { fontMapper } from "@/styles/fonts";
import { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import { createContext, useContext } from "react";
import { UiContent, uiContent } from "@/types/ui-content";

type Params = {
  params: { domain: string; lang: string };
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata | null> {
  const domain = decodeURIComponent(params.domain);
  const data = await getSiteData(domain);
  if (!data) {
    return null;
  }
  const {
    name: title,
    description,
    image,
    logo,
  } = data as {
    name: string;
    description: string;
    image: string;
    logo: string;
  };

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
    },
    icons: [logo],
    metadataBase: new URL(`https://${domain}`),
    // Optional: Set canonical URL to custom domain if it exists
    // ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    //   data.customDomain && {
    //     alternates: {
    //       canonical: `https://${data.customDomain}`,
    //     },
    //   }),
  };
}

export default async function SiteLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  const domain = decodeURIComponent(params.domain);
  const data = await getSiteData(domain);

  if (!data) {
    notFound();
  }

  // Optional: Redirect to custom domain if it exists
  if (
    domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    data.customDomain &&
    process.env.REDIRECT_TO_CUSTOM_DOMAIN_IF_EXISTS === "true"
  ) {
    return redirect(`https://${data.customDomain}`);
  }

  return (
    <div className={fontMapper[data.font]}>
      <Navbar lang='en'/>

      <div className="mt-20">{children}</div>
    </div>
  );
}




const UIContentContext = createContext(uiContent["en-CA"]);

interface UIContentProviderProps {
    children: ReactNode;
    uiContent: UiContent;
  }

export const UIContentProvider: React.FC<UIContentProviderProps> = ({ children, uiContent }) => {
    return (
        <UIContentContext.Provider value={uiContent}>
            {children}
        </UIContentContext.Provider>
    );
};

export const useUIContent = () => {
    return useContext(UIContentContext);
}

