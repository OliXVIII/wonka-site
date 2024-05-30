import { notFound } from "next/navigation";
import { Locale, defaultLocale, localesDetails } from "@/types/languages";
import { fetchData } from "@/server/fetch-data";
import { UpcomingEventPage } from "@/components/upcoming-event/upcoming-event-page";

export async function generateMetadata({
  params,
}: {
  params: { domain: string; lang: Locale; slug: string[] };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug.join("/"));

  // const [data, siteData] = await Promise.all([
  //   getPostData(domain, slug),
  //   getSiteData(domain),
  // ]);
  // if (!data || !siteData) {
  //   return null;
  // }
  // const { title, description } = data;

  //TODO: Get the title and description from the domain and slug
  const title = "Title";
  const description = "Description";

  return {
    title,
    description,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@vercel",
    },
    // Optional: Set canonical URL to custom domain if it exists
    // ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    //   siteData.customDomain && {
    //     alternates: {
    //       canonical: `https://${siteData.customDomain}/${params.slug}`,
    //     },
    //   }),
  };
}

export default async function Page({
  params,
}: {
  params: { domain: string; lang: Locale; slug: string[] };
}) {
  const { slug } = params;
  const domain = decodeURIComponent(params.domain);
  const locale = localesDetails[params.lang] ?? defaultLocale;
  const [data] = await Promise.all([fetchData(domain, locale)]);

  if (!data) {
    notFound();
  }

  if (slug[0] === "upcoming") {
    return <UpcomingEventPage data={data} locale={locale} />;
  }
  return (
    <div className="container mx-auto max-md:px-2 xl:!max-w-screen-xl">
      <h1>Page</h1>
    </div>
  );
}
