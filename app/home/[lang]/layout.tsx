import Navbar from "@/components/layout/navbar";
import { ReactNode } from "react";
import { homePageData, homePageStaticUiContent } from "./page";
import { Locale, defaultLocale, localesDetails } from "@/types/languages";

export default function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: Locale };
}): JSX.Element {
  const locale = localesDetails[params.lang] ?? defaultLocale;

  return (
    <div className="container mx-auto max-md:px-2">
      <Navbar
        staticUiContent={homePageStaticUiContent[locale.languageCode]}
        domain={"local-108"}
        data={homePageData}
        locale={locale}
        inceptionLogo={true}
      />
      {children}
    </div>
  );
}
