import { createLink } from "@/lib/create-link";
import { LocaleDetails } from "@/types/languages";
import { UpcomingEvent } from "@/types/upcoming-event";
import Image from "next/image";
import { ReadMoreButton } from "../read-more-button";
import { MainImageUpcoming } from "./main-image";

type UpcomingEventBannerProps = {
  upcomingEvent: UpcomingEvent;
  locale: LocaleDetails;
};

export const UpcomingEventBanner = ({
  upcomingEvent,
  locale,
}: UpcomingEventBannerProps) => {
  if (!upcomingEvent.images) {
    return null;
  }

  return (
    <a
      href={createLink(upcomingEvent.link, locale)}
      className="container relative mx-auto flex h-96 w-full items-center justify-center"
    >
      <MainImageUpcoming upcomingEvent={upcomingEvent} banner />
      <ReadMoreButton readMore={upcomingEvent.readMore} alignBottomRight />
    </a>
  );
};
