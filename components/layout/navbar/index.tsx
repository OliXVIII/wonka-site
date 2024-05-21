import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search from "./search";
import LogoSquare from "@/components/store/logo-square";
import OpenCart from "@/components/store/cart/open-cart";
import Cart from "@/components/store/cart";
import { Menu } from "@/types/ui-content";
import { LocaleDetails } from "@/types/languages";
import { DataType } from "@/server/fetch-data";
import { ThemeSelector } from "../top-menu/theme-selector/theme-selector-server";

type NavbarProps = {
  locale: LocaleDetails;
  data: DataType;
  searchbar?: boolean;
};

export default function Navbar({ locale, data, searchbar }: NavbarProps) {
  const { uiContent, storage } = data;
  // const menu = await getMenu("next-js-frontend-header-menu");
  const menu = uiContent.navigation;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <nav className="relative flex h-16 items-center justify-between py-2 max-sm:px-4 max-xs:px-1 sm:px-8 lg:px-12">
        <div className="block flex-none md:hidden">
          <MobileMenu menu={menu} searchbar={searchbar} />
        </div>

        <div className="flex w-full items-center">
          <Link
            href="/"
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoSquare storage={storage} />
          </Link>
          <div className="flex w-full justify-center">
            {searchbar ? (
              //SEARCH BAR
              <div className="justify-center sm:hidden md:flex">
                <Search />
              </div>
            ) : (
              <div className="justify-center md:flex"></div>
            )}
            {menu.length ? (
              <ul className="hidden gap-10 text-sm max-sm:p-10 md:flex md:items-center md:px-10">
                {menu.map((item: Menu) => (
                  <li key={item.title}>
                    <Link
                      href={`/${locale.path + item.path}`}
                      className="whitespace-nowrap underline-offset-4 hover:text-neutral-900 dark:hover:text-neutral-200"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          {/*<div className="hidden justify-center md:flex md:w-1/3">
          <Search />
        </div>*/}{" "}
          <div className="flex justify-end">
            <ThemeSelector />
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
