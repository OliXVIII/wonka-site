import { ReactNode } from "react";
import Navbar from "@/components/layout/navbar";
import { Locale, defaultLocale, localesDetails } from "@/types/languages";
import { fetchData } from "@/server/fetch-data";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/footer/footer";
import { staticUiContent } from "@/types/static-ui-content";

export type Params = {
  readonly params: { domain: string; lang: Locale };
  readonly children: ReactNode;
};

export default async function StoreLayout({ params, children }: Params) {
  const locale = localesDetails[params.lang] ?? defaultLocale;
  const data = await fetchData(params.domain, locale);
  const staticUiContent_ = staticUiContent[locale.languageCode]


  if (!data) {
    notFound();
  }

  return (
    <>
      <Navbar
      staticUiContent={staticUiContent_}
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
