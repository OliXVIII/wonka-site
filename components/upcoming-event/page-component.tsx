import { createLink } from "@/lib/create-link";
import { LocaleDetails } from "@/types/languages";
import { UpcomingEvent } from "@/types/upcoming-event";
import { MainImageUpcoming } from "./main-image";
import { ReadMoreButton } from "../read-more-button";

type UpcomingEventBannerCompProps = {
    upcomingEvent: UpcomingEvent;
    locale: LocaleDetails;
    dimensions?: {
      width: any;
      height: number;
    }
  };

export const PageComp = ({
    upcomingEvent,
    locale,
    dimensions
  }: UpcomingEventBannerCompProps) => {
  return (
      <a
        href={createLink(upcomingEvent.link, locale)}
        className={`container relative mx-auto flex ${(dimensions?.height ? "h-" + dimensions.height : "h-96")} h-96 w-full items-center justify-center`}
      >
        <MainImageUpcoming upcomingEvent={upcomingEvent} />
        <ReadMoreButton readMore={upcomingEvent.readMore} alignBottomRight />
      </a>
  );
}