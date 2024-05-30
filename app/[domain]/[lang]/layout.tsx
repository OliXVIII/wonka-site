import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { fetchData } from "@/server/fetch-data";
import { Locale, defaultLocale, localesDetails } from "@/types/languages";
import Footer from "@/components/layout/footer/footer";

export type Params = {
  readonly params: { domain: string; lang: Locale };
  readonly children: ReactNode;
};

export default async function SiteLayout({ params, children }: Params) {
  const domain = decodeURIComponent(params.domain);
  const locale = localesDetails[params.lang] ?? defaultLocale;
  const [data] = await Promise.all([fetchData(domain, locale)]);

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

  return (
    <>
      {children}
      <Footer locale={locale} data={data} />
    </>
  );
}
