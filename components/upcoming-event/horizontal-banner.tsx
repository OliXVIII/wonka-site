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

export const HorizontalBanner = ({
  upcomingEvent,
  locale,
  dimensions,
}: UpcomingEventBannerCompProps) => {
  return (
    <a
      href={createLink(upcomingEvent.link, locale)}
      className={`fixed bottom-0 right-0 ${dimensions?.dimensions == "small" ? `h-${dimensions.small}` : (dimensions?.dimensions == "medium" ? `h-${dimensions.medium}` : "")} 
          w-screen z-50 flex items-end justify-end`}
    >
      <div className="absolute inset-0 h-full w-full">
        <MainImageUpcoming upcomingEvent={upcomingEvent} banner />
      </div>
      <ReadMoreButton readMore={upcomingEvent.readMore} />
    </a>
  );
};
