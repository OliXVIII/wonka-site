"use client";

import { MenuContent } from "@/types/ui-content";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const FooterMenuItem = ({ item }: { item: MenuContent }) => {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === item.path);

  useEffect(() => {
    setActive(pathname === item.path);
  }, [pathname, item.path]);

  return (
    <li className="flex justify-center md:py-2">
      <Link
        href={item.path}
        className={
          "flex whitespace-nowrap py-1 text-center underline-offset-4 md:inline-block"
        }
      >
        {item.title}
      </Link>
    </li>
  );
};

export default function FooterMenu({ menu }: { menu: MenuContent[] }) {
  if (!menu.length) return null;

  return (
    <div className="max-sm:justify-right flex max-md:w-1/2 min-w-fit md:w-1/3 md:border-t md:border-neutral-200">
      <nav className="mb:justify-center m-auto flex items-center max-md:px-2">
        <ul className="mb:justify-center flex flex-col">
          {menu.map((item: MenuContent) => {
            return <FooterMenuItem key={item.title} item={item} />;
          })}
        </ul>
      </nav>
    </div>
  );
}
