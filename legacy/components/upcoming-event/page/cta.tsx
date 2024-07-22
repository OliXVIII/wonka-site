import { UpcomingEvent } from "@/types/upcoming-event";

export const CTAUpcomingEvent = ({
  upcomingEvent,
}: {
  upcomingEvent: UpcomingEvent;
}) => {
  return <p className="my-10 text-center">{upcomingEvent.cta}</p>;
};
