"use client";

import { useEffect, useRef } from "react";

type WrapperProps = {
  children: React.ReactNode;
  dimensionsClass: string;
  href: string;
};

export function BannerWrapper({
  children,
  dimensionsClass,
  href,
}: Readonly<WrapperProps>) {
  const bannerWrapperRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    console.log(window.scrollY, bannerWrapperRef.current);
    const handleScroll = () => {
      if (window.scrollY >= 500 && bannerWrapperRef.current) {
        bannerWrapperRef.current.classList.add("!flex");
      } else if (window.scrollY < 500 && bannerWrapperRef.current) {
        bannerWrapperRef.current.classList.remove("!flex");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <a
      href={href}
      className={`fixed bottom-0 right-0 hidden ${dimensionsClass} z-40 w-screen items-end justify-end border-t-2 border-dark dark:border-t dark:border-light`}
      ref={bannerWrapperRef}
    >
      {children}
    </a>
  );
}
