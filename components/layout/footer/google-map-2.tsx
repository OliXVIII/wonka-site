
import React from 'react';
import {links} from '@/types/ui-content';

export default function Map() {
  return (
    <a className="w-full h-28" href={`http://maps.google.com/?q=1200${links.location}`}>
      <img className="w-full h-full"
      src={`https://maps.googleapis.com/maps/api/staticmap?center=${links.location}&zoom=15&size=1100x100&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`} 
      />
    </a>
  );
}
