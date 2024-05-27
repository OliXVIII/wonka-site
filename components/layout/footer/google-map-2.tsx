
import React from 'react';

export default function Map() {
  return (
    <div className="w-full h-20 relative" >
      <img className="w-full h-full"
      src={'https://maps.googleapis.com/maps/api/staticmap?center=Cafe Temps Perdu,CA&zoom=16&size=1100x80&key=' + process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY } 
      />
    </div>
  );
}
