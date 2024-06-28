import { createLink } from "@/lib/create-link";
import { FeaturesType } from "@/types/features";
import { LocaleDetails } from "@/types/languages";
import { UpcomingEvent } from "@/types/upcoming-event";

import { HorizontalBanner } from "./horizontal-banner";
import { BannerWrapper } from "./horizontal-wrapper";
import { SectionBanner } from "./section-banner";

type UpcomingEventBannerProps = {
  upcomingEvent: UpcomingEvent;
  locale: LocaleDetails;
  banner: FeaturesType["banner"];
  header: string;
};

export const UpcomingEventBanner = ({
  upcomingEvent,
  locale,
  banner,
  header,
}: UpcomingEventBannerProps) => {
  if (!banner) {
    return null;
  }

  if (!upcomingEvent.images) {
    return null;
  }
  let dimensionsClass = "max-md:h-banner-mobile md:h-banner-small"; //default small

  if (banner.size === "medium") {
    dimensionsClass = "max-md:h-banner-mobile md:h-banner-medium";
  }

  if (banner.style === "horizontal") {
    return (
      <BannerWrapper
        dimensionsClass={dimensionsClass}
        href={createLink(upcomingEvent.link, locale)}
      >
        <HorizontalBanner
          upcomingEvent={upcomingEvent}
          dimensionsClass={dimensionsClass}
        />
      </BannerWrapper>
    );
  } else if (banner.style === "section") {
    return (
      <>
        <h2 className="mb-12 text-4xl font-light tracking-[-0.1rem]">
          {header}
        </h2>
        <SectionBanner
          upcomingEvent={upcomingEvent}
          locale={locale}
          banner={banner}
        />
      </>
    );
  }
  return null;
};
