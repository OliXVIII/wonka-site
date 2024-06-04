import { LocaleDetails } from "@/types/languages";
import { UpcomingEvent } from "@/types/upcoming-event";
import { PageComp } from "./page-component";
import { HorizontalBanner } from "./horizontal-banner";
import { FeaturesType } from "@/types/features";
import { BannerWrapper } from "./horizontal-wrapper";
import { createLink } from "@/lib/create-link";

type UpcomingEventBannerProps = {
  upcomingEvent: UpcomingEvent;
  locale: LocaleDetails;
  style: FeaturesType["eventStyle"];
  dimensions?: FeaturesType["bannerSize"];
};

export const UpcomingEventBanner = ({
  upcomingEvent,
  locale,
  style,
  dimensions,
}: UpcomingEventBannerProps) => {
  if (!upcomingEvent.images) {
    return null;
  }
  let dimensionsClass = "";
  if (dimensions === "small") {
    dimensionsClass = "max-md:h-28 md:h-36";
  } else if (dimensions === "medium") {
    dimensionsClass = "max-md:h-28 md:h-44";
  }

  if (style === "horizontal") {
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
  } else if (style === "pageComp") {
    return (
      <PageComp
        upcomingEvent={upcomingEvent}
        locale={locale}
        dimensions={dimensions}
      />
    );
  }
  return null;
};
