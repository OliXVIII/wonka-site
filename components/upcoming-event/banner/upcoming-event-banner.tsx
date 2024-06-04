import { LocaleDetails } from "@/types/languages";
import { UpcomingEvent } from "@/types/upcoming-event";
import { SectionBanner } from "./section-banner";
import { HorizontalBanner } from "./horizontal-banner";
import { FeaturesType } from "@/types/features";
import { BannerWrapper } from "./horizontal-wrapper";
import { createLink } from "@/lib/create-link";

type UpcomingEventBannerProps = {
  upcomingEvent: UpcomingEvent;
  locale: LocaleDetails;
  banner: FeaturesType["banner"];
};

export const UpcomingEventBanner = ({
  upcomingEvent,
  locale,
  banner,
}: UpcomingEventBannerProps) => {
  if (!banner) {
    return null;
  }

  if (!upcomingEvent.images) {
    return null;
  }
  let dimensionsClass = "";
  if (banner.size === "small") {
    dimensionsClass = "max-md:h-banner-mobile md:h-banner-small";
  } else if (banner.size === "medium") {
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
      <SectionBanner
        upcomingEvent={upcomingEvent}
        locale={locale}
        banner={banner}
      />
    );
  }
  return null;
};
