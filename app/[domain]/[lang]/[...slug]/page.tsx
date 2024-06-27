import { notFound } from "next/navigation";

import Footer from "@/components/layout/footer/footer";
import { ServicesPage } from "@/components/services/page";
import { UpcomingEventPage } from "@/components/upcoming-event/page/page";
import { fetchData } from "@/server/fetch-data";
import { Locale, defaultLocale, localesDetails } from "@/types/languages";

type SlugPageParams = {
  params: { domain: string; lang: Locale; slug: string[] };
};

export async function generateMetadata({ params }: SlugPageParams) {
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
          url: storage?.thumbnail ?? storage?.header?.src,
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
// ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
//   siteData.customDomain && {
//     alternates: {
//       canonical: `https://${siteData.customDomain}/${params.slug}`,
//     },
//   }),

export default async function Page({ params }: SlugPageParams) {
  const { slug } = params;
  const domain = decodeURIComponent(params.domain);
  const locale = localesDetails[params.lang] ?? defaultLocale;
  const [data] = await Promise.all([fetchData(domain, locale)]);

  if (!data) {
    notFound();
  }

  if (slug[0] === "upcoming") {
    return (
      <>
        <UpcomingEventPage data={data} locale={locale} />
        <Footer locale={locale} data={data} upcoming={true} />
      </>
    );
  } else if (slug[0] === "services") {
    return (
      <>
        <ServicesPage uiContent={data.uiContent} storage={data.storage} />
        <Footer locale={locale} data={data} />
      </>
    );
  }
  return (
    <div className="container mx-auto max-md:px-2 xl:!max-w-screen-xl">
      <h1>Page</h1>
    </div>
  );
}
