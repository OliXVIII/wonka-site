import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { fetchData } from "@/server/fetch-data";
import Navbar from "@/components/layout/navbar";
import { Locale, defaultLocale, localesDetails } from "@/types/languages";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ServicesComponent } from "@/components/services/services-component";
import { Header } from "@/components/header/header";
import Image from "next/image";
import { UpcomingEventBanner } from "@/components/upcoming-event/banner/upcoming-event-banner";

export type PageParams = {
  params: { domain: string; lang: Locale };
};

export async function generateMetadata({ params }: PageParams) {
  const domain = decodeURIComponent(params.domain);
  const locale = localesDetails[params.lang] ?? defaultLocale;
  const [data] = await Promise.all([fetchData(domain, locale)]);

  const uiContent = data?.uiContent;
  const storage = data?.storage;

  return {
    title: uiContent?.companyName ?? uiContent?.siteName ?? "Home",
    description: uiContent?.mission ?? uiContent?.description ?? "",
    openGraph: {
      images: [
        {
          url: storage?.header?.src,
          width: 800,
          height: 600,
          alt:
            storage?.header?.alt ??
            uiContent?.companyName ??
            uiContent?.siteName ??
            "Home",
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const allSites = await prisma.site.findMany({
    select: {
      subdomain: true,
      customDomain: true,
    },
  });

  const allPaths = allSites
    .flatMap(({ subdomain, customDomain }: any) => [
      subdomain && {
        domain: `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
      },
      customDomain && {
        domain: customDomain,
      },
    ])
    .filter(Boolean);

  return allPaths;
}

const SiteHomePage = async ({ params }: PageParams) => {
  const domain = decodeURIComponent(params.domain);
  const locale = localesDetails[params.lang] ?? defaultLocale;
  const [data] = await Promise.all([fetchData(domain, locale)]);

  if (!data) {
    notFound();
  }

  return (
    <>
      {data.storage.backgroundImageDark && (
        <div className="absolute hidden w-full dark:flex max-md:h-header-mobile md:h-header ">
          <Image
            src={data.storage.backgroundImageDark.src}
            alt="bakground image"
            fill
            className="h-full w-full object-cover"
          />
        </div>
      )}
      {data.storage.backgroundImageLight && (
        <div className="absolute w-full dark:hidden max-md:h-header-mobile md:h-header ">
          <Image
            src={data.storage.backgroundImageLight.src}
            alt="bakground image"
            fill
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="container mx-auto max-md:px-2 xl:!max-w-screen-xl">
        <Navbar locale={locale} data={data} />
        <Header data={data} />
        <Breadcrumb />

        {data?.upcomingEvents && (
          <UpcomingEventBanner
            upcomingEvent={data.upcomingEvents[locale.languageCode]}
            locale={locale}
            style={data.features.eventStyle}
            dimensions={data.features.bannerSize}
          />
        )}
        {data.uiContent?.services && <ServicesComponent data={data} />}
      </div>
    </>
  );
};

export default SiteHomePage;
