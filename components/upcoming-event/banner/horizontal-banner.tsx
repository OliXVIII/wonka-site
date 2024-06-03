import { createLink } from "@/lib/create-link";
import { LocaleDetails } from "@/types/languages";
import { UpcomingEvent } from "@/types/upcoming-event";
import { MainImageUpcoming } from "../main-image";
import { ReadMoreButton } from "../../read-more-button";
import { FeaturesType } from "@/types/features";

type UpcomingEventBannerCompProps = {
  upcomingEvent: UpcomingEvent;
  locale: LocaleDetails;
  dimensions?: FeaturesType["bannerSize"];
};

export const HorizontalBanner = ({
  upcomingEvent,
  locale,
  dimensions,
}: UpcomingEventBannerCompProps) => {
  const className = `fixed bottom-0 hidden right-0 ${dimensions === "small" ? "h-36" : dimensions === "medium" ? "h-44" : ""}`;

  return (
    <a
      href={createLink(upcomingEvent.link, locale)}
      className={`fixed bottom-0 hidden right-0 ${className} z-50 flex w-screen items-end justify-end`}
    >
      <div className="absolute inset-0 h-full w-full">
        <MainImageUpcoming upcomingEvent={upcomingEvent} banner />
      </div>
      <ReadMoreButton readMore={upcomingEvent.readMore} />
    </a>
  );
};
