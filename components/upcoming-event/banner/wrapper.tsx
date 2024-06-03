"use client";

import { useEffect, useRef } from 'react';

type WrapperProps = {
    children: React.ReactNode;
};

export function BannerWrapper({ children }: WrapperProps) {
    const bannerWrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 400 && bannerWrapperRef.current) {
                bannerWrapperRef.current.classList.add("animate-fadeInFromBottom");
                bannerWrapperRef.current.classList.add("block");
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return <div ref={bannerWrapperRef}>{children}</div>;
}