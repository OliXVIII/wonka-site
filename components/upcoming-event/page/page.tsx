import { DataType } from "@/server/fetch-data";
import { LocaleDetails } from "@/types/languages";
import { UpcomingEvent } from "@/types/upcoming-event";
import { MainImageUpcoming } from "./main-image";
import { EventSchedule } from "./schedule/schedule";
import { BookNowButton } from "./book-now";
import { RowImages } from "./row-images";
import { OfferComponent } from "./offer";
import { ReserveModal } from "./reserve-modal";
import { CTAUpcomingEvent } from "./cta";
import { ScheduleDays } from "./schedule/schedule.days";

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
          <div className="my-3 flex max-md:absolute max-md:left-0 max-md:z-10 max-md:h-[50vmax] max-md:w-full max-sm:h-[30vmax] max-xs:h-[30vmax] md:relative md:m-8 md:aspect-video">
            <MainImageUpcoming upcomingEvent={upcomingEventsLocale} />
            <p className="slogan-special bottom-0 mx-auto mb-4 mt-auto w-fit pb-2 pr-2 text-center font-bold text-white max-sm:scale-90">
              {upcomingEventsLocale.slogan}
            </p>
          </div>
          <div className="relative my-3 max-md:h-[50vmax] max-sm:h-[35vmax] max-xs:h-[30vmax] md:hidden"></div>
        </>
      )}
      <h1 className="pb-4 pt-2 text-center text-3xl">
        {upcomingEventsLocale.title}
      </h1>

      <a href="#map">
        <p className="text-center">{upcomingEventsLocale.location}</p>
      </a>
      <p className="pb-4 text-center">{upcomingEventsLocale.date}</p>

      <RowImages upcomingEventsLocale={upcomingEventsLocale} />
      <p className="my-10 whitespace-pre-wrap text-justify leading-5">
        {upcomingEventsLocale.introduction}
      </p>

      <div className="my-10 flex max-md:flex-col">
        <OfferComponent
          upcomingEventsLocale={upcomingEventsLocale}
          uiContent={data.uiContent}
        />
        <ReserveModal
          upcomingEvent={upcomingEventsLocale}
          uiContent={data.uiContent}
          locale={locale}
        />
      </div>

      <EventSchedule upcomingEvent={upcomingEventsLocale}>
        <ScheduleDays upcomingEvent={upcomingEventsLocale} />
      </EventSchedule>
      <CTAUpcomingEvent upcomingEvent={upcomingEventsLocale} />
    </>
  );
};
