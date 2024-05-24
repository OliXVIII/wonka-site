import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
//import Search from "./search";
import LogoSquare from "@/components/store/logo-square";
import OpenCart from "@/components/store/cart/open-cart";
import Cart from "@/components/store/cart";
import { MenuContent } from "@/types/ui-content";
import { LocaleDetails, localesDetails } from "@/types/languages";
import { DataType } from "@/server/fetch-data";
import { ThemeSelector } from "./theme-selector/theme-selector-server";
import { LanguageSelector } from "./language-selector";
import { createLink } from "@/lib/create-link";

type NavbarProps = {
  data: DataType;
  locale: LocaleDetails;
  searchbar?: boolean;
};

export default function Navbar({ locale, data, searchbar }: NavbarProps) {
  const { uiContent, storage, features } = data;
  // const menu = await getMenu("next-js-frontend-header-menu");
  const menu = uiContent.navigation;
  const nextLocale =
    locale.nextLanguage && locale.nextLanguage !== locale.path
      ? localesDetails[locale.nextLanguage]
      : null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <nav className="relative flex h-16 items-center justify-between py-2">
        <div className="block flex-none md:hidden">
          <MobileMenu menu={menu} searchbar={searchbar} locale={locale} />
        </div>

        <div className="flex w-full items-center">
          <Link
            href="/"
            className={`flex w-full items-center justify-center max-sm:ml-10 md:mx-6 md:w-auto`}
          >
            <LogoSquare storage={storage} />
          </Link>

          {searchbar ? (
            //SEARCH BAR
            <div className="flex w-full justify-center sm:hidden">
              <div className="justify-center sm:hidden md:flex">
                {/* <Search /> */}
              </div>
            </div>
          ) : (
            <div className="flex w-full justify-center max-md:hidden">
              <div className="justify-center md:flex"></div>
            </div>
          )}

          {/*<div className="hidden justify-center md:flex md:w-1/3">
          <Search />
        </div>*/}
          <div className="flex justify-end">
            {menu.length > 0 ? (
              <ul
                className={`hidden gap-10 max-sm:p-10 md:flex md:items-center md:px-10 ${features.borderMenuNav ? "border-menu mr-10" : ""}`}
              >
                {menu.map((item: MenuContent) => (
                  <li key={item.title}>
                    <Link
                      href={createLink(item, locale)}
                      className="whitespace-nowrap underline-offset-4"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
            {nextLocale ? <LanguageSelector nextLocale={nextLocale} /> : null}
            <ThemeSelector menu={menu.length > 0} />
            {searchbar ? (
              <Suspense fallback={<OpenCart />}>
                <Cart />
              </Suspense>
            ) : null}{" "}
          </div>
        </div>
      </nav>
    </Suspense>
  );
}
