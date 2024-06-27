import { DataType } from "@/server/fetch-data";
import { LocaleDetails } from "@/types/languages";
import { UpcomingEvent } from "@/types/upcoming-event";

import { BookNowButton } from "./book-now";
import { CTAUpcomingEvent } from "./cta";
import { MainImageUpcoming } from "./main-image";
import { OfferComponent } from "./offer";
import { ReserveModal } from "./reserve-modal";
import { RowImages } from "./row-images";
import { ScheduleDays } from "./schedule/schedule-days";
import { NextWrapper } from "../../next-wrapper";

type UpcomingEventPageProps = {
  data: DataType;
  locale: LocaleDetails;
};

export const UpcomingEventPage = ({ data, locale }: UpcomingEventPageProps) => {
  const { upcomingEvents } = data;

  if (!upcomingEvents) {
    return null;
  }

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
      <p className="left my-10 whitespace-pre-wrap text-justify leading-5">
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

      {upcomingEventsLocale.retreatSchedule && (
        <NextWrapper>
          <ScheduleDays upcomingEvent={upcomingEventsLocale} />
        </NextWrapper>
      )}
      <CTAUpcomingEvent upcomingEvent={upcomingEventsLocale} />
    </>
  );
};
