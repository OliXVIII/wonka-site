import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { fetchData } from "@/server/fetch-data";
import { Locale, defaultLocale, localesDetails } from "@/types/languages";

export type Params = {
  readonly params: { domain: string; lang: Locale };
  readonly children: ReactNode;
};

// export async function generateMetadata({
//   params,
// }: Params): Promise<Metadata | null> {
//   const domain = decodeURIComponent(params.domain);
//   const data = await getSiteData(domain, params.lang);
//   if (!data) {
//     return null;
//   }
//   const {
//     name: title,
//     description,
//     image,
//     logo,
//   } = data as {
//     name: string;
//     description: string;
//     image: string;
//     logo: string;
//   };

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       images: [image],
//     },
//     icons: [logo],
//     metadataBase: new URL(`https://${domain}`),
//     // Optional: Set canonical URL to custom domain if it exists
//     // ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
//     //   data.customDomain && {
//     //     alternates: {
//     //       canonical: `https://${data.customDomain}`,
//     //     },
//     //   }),
//   };
// }

export default async function SiteLayout({ params, children }: Params) {
  const domain = decodeURIComponent(params.domain);
  const locale = localesDetails[params.lang] ?? defaultLocale;
  const data = await fetchData(domain, locale);

  if (!data) {
    notFound();
  }

  // Optional: Redirect to custom domain if it exists
  // if (
  //   domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
  //   data.customDomain &&
  //   process.env.REDIRECT_TO_CUSTOM_DOMAIN_IF_EXISTS === "true"
  // ) {
  //   return redirect(`https://${data.customDomain}`);
  // }

  return { children };
}
