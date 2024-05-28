
import React from 'react';
import {StorageType} from '@/types/storage';

// v2

type MapProps = {
  storage: StorageType;
};

export default function Map({ storage }: MapProps) {
  return (
    <a className="w-full h-28" href={`http://maps.google.com/?q=1200${storage.location}`}>
      <img className="w-full h-full"
      src={`https://maps.googleapis.com/maps/api/staticmap?center=${storage.location}&zoom=15&size=1100x100&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`} 
      />
    </a>
  );
}
