"use client";

import { useEffect, useRef } from "react";

type WrapperProps = {
  children: React.ReactNode;
};

export function BannerWrapper({ children }: Readonly<WrapperProps>) {
  const bannerWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log(window.scrollY, bannerWrapperRef.current);
    const handleScroll = () => {
      if (window.scrollY >= 100 && bannerWrapperRef.current) {
        bannerWrapperRef.current.classList.add("!block");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <div className="hidden banner-fade-in" ref={bannerWrapperRef}>{children}</div>;
}
