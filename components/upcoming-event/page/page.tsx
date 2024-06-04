import { DataType } from "@/server/fetch-data";
import { LocaleDetails } from "@/types/languages";
import { UpcomingEvent } from "@/types/upcoming-event";
import { MainImageUpcoming } from "./main-image";
import { EventSchedule } from "./schedule";
import { BookNowButton } from "./book-now";
import { BottomImages } from "./bottom-images";
import { OfferComponent } from "./offer";

type UpcomingEventPageProps = {
  data: DataType;
  locale: LocaleDetails;
};

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
      <div className="my-8 flex max-sm:flex-col">
        <OfferComponent upcomingEventsLocale={upcomingEventsLocale} />
      </div>

      <EventSchedule upcomingEvent={upcomingEventsLocale} />
    </>
  );
};
