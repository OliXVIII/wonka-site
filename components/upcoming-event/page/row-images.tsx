import { UpcomingEvent } from "@/types/upcoming-event";
import Image from "next/image";
import { ImageModale } from "./images-modal";
import { Suspense } from "react";
import { ImageItem } from "@/types/image";

const RowImage = ({
  event,
  index,
  vertical,
}: {
  event: ImageItem;
  index: number;
  vertical: boolean;
}) => {
  return (
    <a
      className={
        vertical
          ? `relative aspect-square w-fit max-sm:h-1/2 xs:h-1/4`
          : `max-sm:w-1/2 xs:w-1/4`
      }
      href={"#index=" + index}
    >
      {vertical ? (
        <Image
          src={event.src}
          alt={event.alt ?? "Upcoming Event Image"}
          fill={!event.width && !event.height}
          width={event.width}
          height={event.height}
          className="rounded-3xl p-2.5 max-sm:p-1.5 md:rounded-[3rem]"
        />
      ) : (
        <>
          <div className={`relative aspect-square w-full`}>
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
        </>
      )}
    </a>
  );
};

export const RowImages = ({
  upcomingEventsLocale,
  vertical = false,
}: {
  upcomingEventsLocale: UpcomingEvent;
  vertical?: boolean;
}) => {
  return (
    <div
      className={`flex flex-wrap items-center ${vertical ? "overflow-y w-full flex-col max-lg:hidden" : "overflow-x-auto md:mx-5"} justify-between`}
    >
      {upcomingEventsLocale.images?.map((event, i) =>
        !event.main ? (
          <RowImage key={i} event={event} vertical={vertical} index={i} />
        ) : null,
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <ImageModale upComingEvent={upcomingEventsLocale} />
      </Suspense>
    </div>
  );
};
