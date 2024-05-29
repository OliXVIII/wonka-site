"use client";

import { createLink } from "@/lib/create-link";
import { LocaleDetails } from "@/types/languages";
import { MenuContent } from "@/types/ui-content";
import Link from "next/link";
import { usePathname } from "next/navigation";

type FooterMenuItemsProps = {
  readonly item: MenuContent;
  readonly locale: LocaleDetails;
}

type FooterMenuProps = {
  readonly menu: MenuContent[];
  readonly locale: LocaleDetails;
}

const FooterMenuItem = ({ item, locale }: FooterMenuItemsProps) => {

  return (
    <li className="flex justify-center md:py-2">
      <Link
        href={createLink(item, locale)}
        className={
          "flex whitespace-nowrap py-1 text-center underline-offset-4 md:inline-block"
        }
      >
        {item.title}
      </Link>
    </li>
  );
};

export default function FooterMenu({ menu, locale }: FooterMenuProps) {
  if (!menu.length) return null;

  return (
    <div className="max-sm:justify-right flex max-md:w-1/2 min-w-fit md:w-1/3 md:border-t md:border-neutral-300">
      <nav className="mb:justify-center m-auto flex items-center max-md:px-2">
        <ul className="mb:justify-center flex flex-col">
          {menu.map((item: MenuContent) => {
            return <FooterMenuItem locale={locale} key={item.title} item={item} />;
          })}
        </ul>
      </nav>
    </div>
  );
}
