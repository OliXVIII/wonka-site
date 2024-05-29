import { ReactNode } from "react";
import Navbar from "@/components/layout/navbar";
import { Locale, defaultLocale, localesDetails } from "@/types/languages";
import { fetchData } from "@/server/fetch-data";
import Footer from "@/components/layout/footer/footer";

export type Params = {
  readonly params: { domain: string; lang: Locale; slug: string };
  readonly children: ReactNode;
};

export default async function SlugLayout({ params, children }: Params) {
  const locale = localesDetails[params.lang] ?? defaultLocale;
  const data = await fetchData(params.domain, locale);

  return (
    <>
      <div className="container mx-auto max-md:px-2 xl:!max-w-screen-xl">
        <Navbar locale={locale} data={data} />
        {children}
      </div>
      <Footer locale={locale} data={data} />
    </>
  );
}
