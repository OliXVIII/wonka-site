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
      className="relative flex h-28 w-screen"
      href={`http://maps.google.com/?q=1200${storage.location}`}
    >
      <Image
        className="h-full w-full"
        alt={storage.location ?? "Map"}
        src={`https://maps.googleapis.com/maps/api/staticmap?center=${storage.location}&zoom=15&size=1100x150&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        objectFit="cover"
        fill
        quality={100}
      />
    </a>
  );
}
