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
    <li className="flex items-center mb:justify-center max-sm:max-w md:py-2">
      <Link
        href={item.path}
        className={clsx(
          "flex justify-center p-1 text-lg underline-offset-4 hover:text-black dark:hover:text-neutral-300 md:inline-block md:text-sm",
          {
            "text-black dark:text-neutral-300": active,
          },
        )}
      >
        {item.title}
      </Link>
    </li>
  );
};

export default function FooterMenu({ menu }: { menu: MenuContent[] }) {
  if (!menu.length) return null;

  return (
    <nav className="m-auto flex items-center mb:justify-center">
      <ul className="flex flex-col mb:justify-center">
        {menu.map((item: MenuContent) => {
          return <FooterMenuItem key={item.title} item={item} />;
        })}
      </ul>
    </nav>
  );
}
