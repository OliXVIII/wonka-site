import { UpcomingEvent } from "@/types/upcoming-event";

type EventScheduleType = {
  upcomingEvent: UpcomingEvent;
};

export const EventSchedule = ({ upcomingEvent }: EventScheduleType) => {
  const { retreatSchedule } = upcomingEvent;

  if (!retreatSchedule) {
    return null;
  }

  return (
    <div className="mt-8 min-h-screen">
      {retreatSchedule.map((day, index) => (
        <div key={index} className="mb-12">
          <h3 className="mb-4 text-center font-normal underline underline-offset-4">
            {day.day}
          </h3>
          <ul className="shadow-md dark:shadow-sm sm:mx-[10%]">
            {day.events.map((event, idx) => (
              <li
                key={idx}
                className="mb-4 p-4 shadow-md dark:shadow-sm dark:shadow-white"
              >
                <p className="">
                  {event.time} - {event.description}
                </p>
                {event.subEvents && (
                  <ul className="mt-2 list-inside list-disc">
                    {event.subEvents.map((subEvent, sIdx) => (
                      <li key={sIdx}>{subEvent}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
