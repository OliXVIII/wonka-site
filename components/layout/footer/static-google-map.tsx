import React from "react";
import { StorageType } from "@/types/storage";
import Image from "next/image";

// v2

type MapProps = {
  storage: StorageType;
};

export default function StaticGoogleMap({ storage }: MapProps) {
  return (
    <a
      className="relative flex h-28 w-screen dark:invert-[91%]"
      href={`http://maps.google.com/?q=1200${storage.location}`}
      target="_blank"
    >
      <Image
        className="h-full w-full object-cover"
        alt={storage.location ?? "Map"}
        src={`https://maps.googleapis.com/maps/api/staticmap?center=${storage.location}&zoom=14&scale=2&size=1100x150&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&markers=color:cornflowerblue|${storage.location}`}
        fill
        quality={100}
      />
    </a>
  );
}
