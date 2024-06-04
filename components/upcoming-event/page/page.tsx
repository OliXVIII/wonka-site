import { DataType } from "@/server/fetch-data";
import { LocaleDetails } from "@/types/languages";
import { UpcomingEvent } from "@/types/upcoming-event";
import { MainImageUpcoming } from "./main-image";
import { EventSchedule } from "./schedule";
import { BookNowButton } from "./book-now";
import { BottomImages } from "./bottom-images";

type UpcomingEventPageProps = {
  data: DataType;
  locale: LocaleDetails;
};

const roomOptions = [
  {
    title: "4-Person Room",
    quantity: 12,
    price: "$720",
    taxTPS: "$36",
    taxTVQ: "$71.82",
    totalPrice: "$827.82",
    description: "Room for four people",
  },
  {
    title: "2-Person Room",
    quantity: 3,
    price: "$770",
    taxTPS: "$38.5",
    taxTVQ: "$76.81",
    totalPrice: "$885.31",
    description: "Room for two people",
  },
];

export const UpcomingEventPage = ({ data, locale }: UpcomingEventPageProps) => {
  const { upcomingEvents } = data;

  const upcomingEventsLocale: UpcomingEvent =
    upcomingEvents[locale.languageCode];

  if (!upcomingEventsLocale.images) {
    return null;
  }
  const main =
    upcomingEventsLocale?.images?.filter((event) => event.main)[0] ||
    upcomingEventsLocale.images[0];

  return (
    <>
      {main && (
        <>
          <div className="flex max-md:absolute max-md:left-0 max-md:z-10 max-md:h-[50vmax] max-md:w-full max-sm:h-[35vmax] max-xs:h-[30vmax] md:relative md:m-8 md:aspect-video">
            <MainImageUpcoming upcomingEvent={upcomingEventsLocale} />
            <p className="slogan-special bottom-0 mx-auto mb-4 mt-auto w-fit pb-2 pr-2 text-center font-bold text-white">
              {upcomingEventsLocale.slogan}
            </p>
          </div>
          <div className="relative my-3 max-md:h-[50vmax] max-sm:h-[35vmax] max-xs:h-[30vmax] md:hidden"></div>{" "}
        </>
      )}
      <h1 className="text-center text-2xl">{upcomingEventsLocale.title}</h1>
      <p className="text-center">{upcomingEventsLocale.date}</p>

      <BottomImages upcomingEventsLocale={upcomingEventsLocale} />
      <div className="flex max-sm:flex-col">
        <p className="my-10 text-justify sm:w-1/2">
          {upcomingEventsLocale.description}
        </p>

        {/* Room options */}
        <div className="mx-auto flex w-full flex-col sm:w-1/2 sm:px-[2%] md:px-[5%]">
          {roomOptions.map((room, i) => (
            <div
              key={i}
              className="my-2 rounded-box p-1 shadow-md dark:shadow-inner dark:shadow-white"
            >
              <div className="flex justify-around">
                <h3 className="text-center text-xl">
                  {room.title} ({room.quantity} available)
                </h3>
              </div>
              <div className="flex justify-between">
                <p className="text-end text-xl smtrace:mt-4">{room.price}</p>
                <BookNowButton></BookNowButton>
              </div>
              <p className="text-center">{room.description}</p>
            </div>
          ))}
        </div>
      </div>

      <EventSchedule upcomingEvent={upcomingEventsLocale} />
    </>
  );
};
