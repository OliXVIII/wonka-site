import { ReactNode } from "react";
import Navbar from "@/components/layout/navbar";
import { Locale, defaultLocale, localesDetails } from "@/types/languages";
import { fetchData } from "@/server/fetch-data";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/footer/footer";

export type Params = {
  readonly params: { domain: string; lang: Locale };
  readonly children: ReactNode;
};

export default async function StoreLayout({ params, children }: Params) {
  const locale = localesDetails[params.lang] ?? defaultLocale;
  const data = await fetchData(params.domain, locale);

  if (!data) {
    notFound();
  }

  return (
    <>
      <Navbar
        domain={data.domain}
        locale={locale}
        data={data}
        searchbar={true}
        slug={""}
      />
      {children}
      <Footer locale={locale} data={data} upcoming={true} />
    </>
  );
}
