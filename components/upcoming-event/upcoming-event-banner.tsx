import { LocaleDetails } from "@/types/languages";
import { UpcomingEvent } from "@/types/upcoming-event";
import { PageComp } from "./page-component";
import { HorizontalBanner } from "./horizontal-banner";
import { FeaturesType } from "@/types/features";

type UpcomingEventBannerProps = {
  upcomingEvent: UpcomingEvent;
  locale: LocaleDetails;
  style: FeaturesType["eventStyle"];
  dimensions?: FeaturesType["eventDimensions"];
};

export const UpcomingEventBanner = ({
  upcomingEvent,
  locale,
  style,
  dimensions
}: UpcomingEventBannerProps) => {
  if (!upcomingEvent.images) {
    return null;
  }
  return (
    (style === "pageComp" && <PageComp upcomingEvent={upcomingEvent} locale={locale} dimensions={dimensions}/>) ||
    (style === "horizontal" && <HorizontalBanner upcomingEvent={upcomingEvent} locale={locale} dimensions={dimensions} />)
  );
};
