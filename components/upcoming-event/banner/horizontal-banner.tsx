import { UpcomingEvent } from "@/types/upcoming-event";
import { MainImageUpcoming } from "../page/main-image";
import { ReadMoreButton } from "../../read-more-button";

type UpcomingEventBannerCompProps = {
  upcomingEvent: UpcomingEvent;
  dimensionsClass: string;
};

export const HorizontalBanner = ({
  upcomingEvent,
  dimensionsClass,
}: UpcomingEventBannerCompProps) => {
  return (
    <>
      <div className={`${dimensionsClass} absolute inset-0 h-full w-full`}>
        <MainImageUpcoming upcomingEvent={upcomingEvent} banner />
      </div>
      <ReadMoreButton readMore={upcomingEvent.readMore} />
    </>
  );
};
