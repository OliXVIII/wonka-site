/* eslint-disable react/display-name */
"use client";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { Fragment, forwardRef, useEffect, useState } from "react";
import { MenuContent } from "@/types/ui-content";
import { createLink } from "@/lib/create-link";
import { LocaleDetails } from "@/types/languages";
import { useSession } from "next-auth/react";

type MobileMenuProps = {
  menu: MenuContent[];
  locale: LocaleDetails;
};

let MyDialogPanel = forwardRef(function (props: any, ref: any) {
  return (
    <DialogPanel className="max-w-xl bg-light p-12" ref={ref} {...props} />
  );
});

export default function ProfileMenu({
  menu,
  locale,
}: Readonly<MobileMenuProps>) {
  const { data: session } = useSession();
  console.log("session", session);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);
  console.log("menu", menu);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

return (
    <>
        <button
            onClick={openMobileMenu}
            aria-label="Open mobile menu"
            className="flex h-11 w-11 items-center justify-center rounded-md text-black transition-colors dark:border-neutral-700 dark:text-light"
        >
            <img
                src={session?.user?.image as string}
                className="z-40 h-12 w-12 object-fit rounded-full"
            />
        </button>
        <Transition
            as={Dialog}
            show={isOpen}
            onClose={closeMobileMenu}
            className="relative z-50 flex"
        >
            <div>
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            </div>
            <TransitionChild
                as={MyDialogPanel}
                enter="transition-all ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition-all ease-in-out duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
                className="fixed bottom-0 right-0 top-0 flex h-48 w-72 max-w-full flex-col bg-light pb-6 dark:bg-black"
            >
                <div className="p-4">
                    <button
                        className="absolute top-4 right-4 mb-4 flex h-11 w-11 items-center justify-center rounded-md transition-colors"
                        onClick={closeMobileMenu}
                        aria-label="Close mobile menu"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                    {menu.length ? (
                        <ul className="flex w-full flex-col">
                            {menu.map((item: MenuContent) => (
                                <li
                                    className="py-2 text-xl transition-colors dark:text-white"
                                    key={item.title}
                                >
                                    <Link
                                        href={createLink(item, locale)}
                                        onClick={closeMobileMenu}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </div>
            </TransitionChild>
        </Transition>
    </>
);
}
