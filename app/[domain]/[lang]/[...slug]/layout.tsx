import { notFound } from "next/navigation";
import { ReactNode } from "react";

import Navbar from "@/components/layout/navbar";
import { fetchData } from "@/server/fetch-data";
import { Locale, defaultLocale, localesDetails } from "@/types/languages";
import { staticUiContent } from "@/types/static-ui-content";

export type Params = {
  readonly params: { domain: string; lang: Locale; slug: string[] };
  readonly children: ReactNode;
};

export default async function SlugLayout({ params, children }: Params) {
  const locale = localesDetails[params.lang] ?? defaultLocale;
  const data = await fetchData(params.domain, locale);

  if (!data) {
    notFound();
  }

  return (
    <div className="container mx-auto max-md:px-2">
      <Navbar
        staticUiContent={staticUiContent[locale.languageCode]}
        domain={params.domain}
        locale={locale}
        data={data}
        slug={params.slug.join("/")}
      />
      {children}
    </div>
  );
}
