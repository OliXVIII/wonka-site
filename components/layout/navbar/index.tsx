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
      <nav className="relative flex items-center justify-between p-4 lg:px-6">
        <div className="block flex-none md:hidden">
          <MobileMenu menu={menu} searchbar={searchbar} />
        </div>

        <div className="flex w-full items-center">
          <div className="flex w-full md:w-1/3">
            <Link
              href="/"
              className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
            >
              <LogoSquare storage={storage} />
              <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
                {uiContent.siteName}
              </div>
            </Link>

            {searchbar ? (
              //SEARCH BAR
              <div className="justify-center sm:hidden md:flex md:w-1/3">
                <Search />
              </div>
            ) : (
              <div className="justify-center md:flex md:w-1/3"></div>
            )}
            {menu.length ? (
              <ul className="hidden h-20 gap-10 text-sm max-sm:p-10 md:flex md:items-center md:px-10">
                {menu.map((item: Menu) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      className="whitespace-nowrap text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
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
        </div>*/}
          {searchbar ? (
            <div className="flex justify-end md:w-1/3">
              <Suspense fallback={<OpenCart />}>
                <Cart />
              </Suspense>
            </div>
          ) : null}
        </div>
      </nav>
    </Suspense>
  );
}
