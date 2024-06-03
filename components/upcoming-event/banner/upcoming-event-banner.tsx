import { LocaleDetails } from "@/types/languages";
import { UpcomingEvent } from "@/types/upcoming-event";
import { PageComp } from "./page-component";
import { HorizontalBanner } from "./horizontal-banner";
import { FeaturesType } from "@/types/features";
import { BannerWrapper } from "./wrapper";

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
  return (
    (style === "pageComp" && (
      <PageComp
        upcomingEvent={upcomingEvent}
        locale={locale}
        dimensions={dimensions}
      />
    )) || (
      <BannerWrapper>
        {style === "horizontal" && (
          <HorizontalBanner
            upcomingEvent={upcomingEvent}
            locale={locale}
            dimensions={dimensions}
          />
        )}
      </BannerWrapper>
    )
  );
};
