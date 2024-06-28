import Image from "next/image";
import { notFound } from "next/navigation";

import { Header } from "@/components/header/header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import Footer from "@/components/layout/footer/footer";
import Navbar from "@/components/layout/navbar";
import { ServicesSection } from "@/components/services/section";
import { UpcomingEventBanner } from "@/components/upcoming-event/banner/upcoming-event-banner";
import prisma from "@/lib/prisma";
import { fetchData } from "@/server/fetch-data";
import { Locale, defaultLocale, localesDetails } from "@/types/languages";
import { staticUiContent } from "@/types/static-ui-content";

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

// export async function generateStaticParams() {
//   const allSites = await prisma.site.findMany({
//     select: {
//       subdomain: true,
//       customDomain: true,
//     },
//   });

//   const allPaths = allSites
//     .flatMap(({ subdomain, customDomain }: any) => [
//       subdomain && {
//         domain: `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
//       },
//       customDomain && {
//         domain: customDomain,
//       },
//     ])
//     .filter(Boolean);

//   return allPaths;
// }

const SiteHomePage = async ({ params }: PageParams) => {
  const domain = decodeURIComponent(params.domain);
  const locale = localesDetails[params.lang] ?? defaultLocale;
  const [data] = await Promise.all([fetchData(domain, locale)]);
  const staticUiContents = staticUiContent[locale.languageCode];

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
        <Navbar
          staticUiContent={staticUiContents}
          domain={domain}
          locale={locale}
          data={data}
          slug={""}
        />
        <Header data={data} />
        <Breadcrumb />

        {data.uiContent?.services && <ServicesSection data={data} />}
        {data?.upcomingEvents && data?.uiContent?.ourNextTrip ? (
          <UpcomingEventBanner
            upcomingEvent={data.upcomingEvents[locale.languageCode]}
            locale={locale}
            banner={data.features.banner}
            header={data.uiContent.ourNextTrip}
          />
        ) : null}
      </div>
      <Footer locale={locale} data={data} />
    </>
  );
};

export default SiteHomePage;
