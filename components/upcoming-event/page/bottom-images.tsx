import { UpcomingEvent } from "@/types/upcoming-event";
import Image from "next/image";

export const BottomImages = ({
  upcomingEventsLocale,
}: {
  upcomingEventsLocale: UpcomingEvent;
}) => {
  return (
    <ul className="flex flex-wrap justify-between overflow-x-auto md:mx-5">
      {upcomingEventsLocale.images?.map((event, i) =>
        !event.main ? (
          <li key={i} className="max-sm:min-w-[32%] xs:w-1/4">
            <div className="relative aspect-square p-2.5 max-xs:p-1 lg:p-5">
              <Image
                src={event.src}
                alt={event.alt ?? "Upcoming Event Image"}
                fill={!event.width && !event.height}
                width={event.width}
                height={event.height}
                className="rounded-3xl p-2.5 max-xs:p-1.5 md:rounded-[3rem] lg:p-5"
              />
            </div>
            <p className="text-center">{event.alt}</p>
          </li>
        ) : null,
      )}
    </ul>
  );
};
