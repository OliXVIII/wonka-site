import { createLink } from "@/lib/create-link";
import { FeaturesType } from "@/types/features";
import { LocaleDetails } from "@/types/languages";
import { UpcomingEvent } from "@/types/upcoming-event";

import { ReadMoreButton } from "../../read-more-button";
import { MainImageUpcoming } from "../page/main-image";

type UpcomingEventBannerCompProps = {
  upcomingEvent: UpcomingEvent;
  locale: LocaleDetails;
  banner: FeaturesType["banner"];
};

export const SectionBanner = ({
  upcomingEvent,
  locale,
  banner,
}: UpcomingEventBannerCompProps) => {
  if (!banner) {
    return null;
  }
  return (
    <a
      href={createLink(upcomingEvent.link, locale)}
      className={`container relative mx-auto mt-10 flex h-52 w-full items-center justify-center md:h-72 xl:h-96`}
    >
      <MainImageUpcoming upcomingEvent={upcomingEvent} />
      <ReadMoreButton readMore={upcomingEvent.readMore} alignBottomRight />
    </a>
  );
};
