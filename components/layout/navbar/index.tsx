import Link from "next/link";
import MobileMenu from "./mobile-menu";
import { Suspense } from "react";
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
import Image from "next/image";
import { LoginButton } from "@/components/login/button";

type NavbarProps = {
  data: DataType;
  locale: LocaleDetails;
  slug?: string;
  searchbar?: boolean;
  inceptionLogo?: boolean;
  domain: string;
};

export default function Navbar({
  locale,
  data,
  searchbar,
  slug = "",
  inceptionLogo,
  domain,
}: NavbarProps) {
  const { uiContent, storage, features } = data;
  // const menu = await getMenu("next-js-frontend-header-menu");
  const menu = uiContent.navigation;
  const profileMenu = uiContent.profileMenu;
  const nextLocale =
    locale?.nextLanguage && locale.nextLanguage !== locale.path
      ? localesDetails[locale.nextLanguage]
      : null;
  return (
    <>
      <nav
        className={`flex h-16 w-full items-center justify-between py-2 ${features.navbar?.fixed ? " fixed z-40 mx-auto" : "relative"}`}
      >
        <div className="block flex-none md:hidden">
          <MobileMenu menu={menu} searchbar={searchbar} locale={locale} />
        </div>

        <div className="flex w-full items-center">
          {!inceptionLogo ? (
            <Link
              href="/"
              className={`flex w-full items-center justify-center max-sm:ml-10 md:mx-6 md:w-auto`}
            >
              <LogoSquare storage={storage} />
            </Link>
          ) : (
            <div>
              <a
                className="absolute top-0 mx-auto mt-1 h-24 w-24 max-sm:animate-spin-slow max-xs:left-1 max-xs:mt-3 max-xs:h-20 max-xs:w-20 sm:hover:animate-spin-slow"
                href={`/`}
              >
                <Image
                  src={storage?.logo?.navbar?.src || "/homepage/logo.png"}
                  alt="logo"
                  fill
                  className="dark:invert"
                />
              </a>
            </div>
          )}

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
            {nextLocale ? (
              <LanguageSelector nextLocale={nextLocale} slug={slug} />
            ) : null}
            <ThemeSelector menu={menu.length > 0} />
            {searchbar ? (
              <Suspense fallback={<OpenCart />}>
                <Cart />
              </Suspense>
            ) : null}
            {profileMenu?.length ? (
              <LoginButton domain={domain} profileMenu={profileMenu} locale={locale} />
            ) : null}
          </div>
        </div>
      </nav>
      {features.navbar.fixed ?? <div className="h-16"></div>}
    </>
  );
}
