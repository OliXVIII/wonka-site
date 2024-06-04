import { UpcomingEvent } from "@/types/upcoming-event";
import Image from "next/image";
import { ImageModale } from "./images-modal";
import { Suspense } from "react";

export const BottomImages = ({
  upcomingEventsLocale,
}: {
  upcomingEventsLocale: UpcomingEvent;
}) => {
  return (
    <div className="flex flex-wrap justify-between overflow-x-auto md:mx-5">
      {upcomingEventsLocale.images?.map((event, i) =>
        !event.main ? (
          <a key={i} className="max-sm:w-1/2 xs:w-1/4" href={"#index=" + i}>
            <div className="relative aspect-square">
              <Image
                src={event.src}
                alt={event.alt ?? "Upcoming Event Image"}
                fill={!event.width && !event.height}
                width={event.width}
                height={event.height}
                className="rounded-3xl p-2.5 max-sm:p-1.5 md:rounded-[3rem] lg:p-5"
              />
            </div>
            <p className="text-center">{event.alt}</p>
          </a>
        ) : null,
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <ImageModale upComingEvent={upcomingEventsLocale} />
      </Suspense>
    </div>
  );
};
