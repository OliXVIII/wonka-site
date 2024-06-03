"use client";

import { useEffect, useRef } from "react";

type WrapperProps = {
  children: React.ReactNode;
};

export function BannerWrapper({ children }: Readonly<WrapperProps>) {
  const bannerWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 400 && bannerWrapperRef.current) {
        bannerWrapperRef.current.classList.add("animate-fade-up", "animate-once", "animate-ease-out", "block");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <div ref={bannerWrapperRef}>{children}</div>;
}
