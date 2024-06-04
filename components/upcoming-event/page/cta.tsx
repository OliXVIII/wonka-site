import { UpcomingEvent } from "@/types/upcoming-event";

export const CTAUpcomingEvent = ({
  upcomingEvent,
}: {
  upcomingEvent: UpcomingEvent;
}) => {
  return (
    <div className="flex hidden items-center justify-center">
      <button className="bg-primary rounded-lg px-4 py-2 text-white">
        {upcomingEvent.cta}
      </button>
    </div>
  );
};
