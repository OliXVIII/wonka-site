import { createLink } from "@/lib/create-link";
import { LocaleDetails } from "@/types/languages";
import { UpcomingEvent } from "@/types/upcoming-event";
import { MainImageUpcoming } from "./main-image";
import { ReadMoreButton } from "../read-more-button";
import { FeaturesType } from "@/types/features";

type UpcomingEventBannerCompProps = {
    upcomingEvent: UpcomingEvent;
    locale: LocaleDetails;
    dimensions?: FeaturesType["eventDimensions"];
  };

export const PageComp = ({
    upcomingEvent,
    locale,
    dimensions
  }: UpcomingEventBannerCompProps) => {
  return (
      <a
        href={createLink(upcomingEvent.link, locale)}
        className={`container relative mx-auto flex ${dimensions === "small" ? "h-40" : dimensions === "medium" ? "h-44" : ""} w-full items-center justify-center`}
      >
        <MainImageUpcoming upcomingEvent={upcomingEvent} />
        <ReadMoreButton readMore={upcomingEvent.readMore} alignBottomRight />
      </a>
  );
}