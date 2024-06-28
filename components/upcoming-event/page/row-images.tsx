import Image from "next/image";
import { Suspense } from "react";

import { NextWrapper } from "@/components/next-wrapper";
import { ImageItem } from "@/types/image";
import { UpcomingEvent } from "@/types/upcoming-event";

import { ImageModale } from "./images-modal";

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
          <div className="h-5"></div>
          <div className={`relative aspect-square w-full`}>
            <Image
              src={event.src}
              alt={event.alt ?? "Upcoming Event Image"}
              fill={!event.width && !event.height}
              width={event.width}
              height={event.height}
              className="rounded-3xl object-cover p-2.5 max-sm:p-1.5 md:rounded-[3rem] lg:p-5"
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
  //make pack of 4 images list from upcomingEventsLocale.images, like [[img1, img2, img3, img4], [img5, img6, img7, img8], ...
  if (!upcomingEventsLocale.images) {
    return null;
  }
  //remove event.main from the list
  const images = upcomingEventsLocale.images.filter((event) => !event.main);
  function chunkArrayInGroups(arr: ImageItem[], size: number) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }

  const imagePacks = chunkArrayInGroups(images, 4);
  console.log(imagePacks);

  return vertical ? (
    <div
      className={`overflow-y flex w-full flex-col flex-wrap items-center justify-between max-lg:hidden`}
    >
      {imagePacks[0].map((event, i) =>
        !event.main ? (
          <RowImage key={i} event={event} vertical={vertical} index={i} />
        ) : null,
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <ImageModale upComingEvent={upcomingEventsLocale} />
      </Suspense>
    </div>
  ) : (
    <NextWrapper>
      {imagePacks.map((pack, i) => (
        <div
          key={i}
          className={`scroll-snap-align-start flex w-full flex-shrink-0 flex-wrap items-center overflow-x-auto max-md:px-3.5 md:px-5`}
        >
          {pack.map((event, i) => (
            <RowImage key={i} event={event} vertical={vertical} index={i} />
          ))}
        </div>
      ))}
    </NextWrapper>
  );
};
