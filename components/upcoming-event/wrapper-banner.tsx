'use client';
import { useEffect, useRef } from 'react';

type WrapperProps = {
    children: React.ReactNode;
};

export function BannerWrapper({ children }: WrapperProps) {
    const mainWrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (mainWrapperRef.current) {
            const observer = new IntersectionObserver(
                (entries) => {
                    const scrollContainer = mainWrapperRef.current;
                    if (
                        (scrollContainer && scrollContainer.getBoundingClientRect().bottom > scrollContainer.scrollHeight + 50) ||
                        (scrollContainer &&
                            entries[0].rootBounds &&
                            scrollContainer.getBoundingClientRect().bottom - window.innerHeight < -30)
                    ) {
                        document.documentElement.style.scrollSnapType = 'none';
                        document.body.style.scrollSnapType = 'none';
                    } else {
                        document.documentElement.style.scrollSnapType = 'y mandatory';
                        document.body.style.scrollSnapType = 'y mandatory';
                    }
                },
                {
                    threshold: Array.from({ length: 100 }, (_, i) => i * 0.008), // multiple thresholds for finer granularity
                }
            );
            observer.observe(mainWrapperRef.current);

            // Cleanup function to disconnect observer
            return () => {
                observer.disconnect();
            };
        }
    }, []);

    return <div ref={mainWrapperRef}>{children}</div>;
}