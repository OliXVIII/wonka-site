"use client";

import { Loader } from "@googlemaps/js-api-loader"


const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  version: "weekly",
});

let map: google.maps.Map;

loader.load().then(async () => {
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  map = new Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 46.78730136218648, lng: -71.26663597022774 },
    zoom: 15,
  });
});

const FooterMap = () => {
  return (
    <div id="map" className="h-[150px] w-full"></div>
  );
}

export default FooterMap