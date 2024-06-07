import { UpcomingEvent } from "@/types/upcoming-event";

export const ScheduleDays = ({
  upcomingEvent,
}: {
  upcomingEvent: UpcomingEvent;
}) => {
  const { retreatSchedule } = upcomingEvent;

  if (!retreatSchedule) {
    return null;
  }

  return (
    <>
      {retreatSchedule.map((day, index) => (
        <div
          key={index}
          className="scroll-snap-align-start w-full flex-shrink-0"
        >
          <h3 className="mb-4 text-center font-normal underline underline-offset-4">
            {day.day}
          </h3>
          <ul className="mx-auto flex h-full w-full flex-col justify-center px-[20%] max-xs:px-[12%]">
            {day.events.map((event, idx) => (
              <li
                key={idx}
                className="mb-4 w-full p-2 shadow-md dark:shadow-sm dark:shadow-white"
              >
                <p>
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
    </>
  );
};
