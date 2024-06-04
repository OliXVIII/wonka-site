import React from "react";
import Image from "next/image";

// v2

type MapProps = {
  location: string;
};

export default function StaticGoogleMap({ location }: MapProps) {
  return (
    <a
      className="relative flex h-28 max-w-[98vw] dark:invert-[91%]"
      href={`http://maps.google.com/?q=1200${location}`}
      target="_blank"
    >
      <Image
        className="object-cover"
        alt={location ?? "Map"}
        src={`https://maps.googleapis.com/maps/api/staticmap?center=${location}&zoom=14&scale=2&size=1100x150&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&markers=color:cornflowerblue|${location}`}
        fill
        quality={100}
      />
    </a>
  );
}
