import { Offer, UpcomingEvent } from "@/types/upcoming-event";
import { BookNowButton } from "./book-now";

const OfferInfo = ({ room }: { room: Offer }) => (
  <div key={room.title} className="my-2 h-full rounded-box p-1 max-sm:min-h-44">
    <div className="justify-around">
      <h3 className="text-center text-xl">{room.title}</h3>
      <p className="text-center text-xl">({room.quantity} available)</p>
    </div>
    <div className="flex justify-between">
      <p className="text-end text-xl smtrace:mt-4">{room.price}</p>
    </div>
    <p className="text-center">{room.description}</p>
    <BookNowButton />
  </div>
);

export const OfferComponent = ({
  upcomingEventsLocale,
}: {
  upcomingEventsLocale: UpcomingEvent;
}) => {
  if (
    !upcomingEventsLocale.offerOptions ||
    upcomingEventsLocale.offerOptions.length === 0
  ) {
    return null;
  }
  if (upcomingEventsLocale.offerOptions.length === 1) {
    return (
      <>
        <p className="my-10 text-justify sm:w-1/2">
          {upcomingEventsLocale.description}
        </p>
        <div className="mx-auto flex w-full flex-col sm:w-1/2 sm:px-[2%] md:px-[5%]">
          <div className="my-2 rounded-box p-1 shadow-md dark:shadow-inner dark:shadow-white">
            <div className="flex justify-around">
              <h3 className="text-center text-xl">
                {upcomingEventsLocale.offerOptions[0].title} (
                {upcomingEventsLocale.offerOptions[0].quantity} available)
              </h3>
            </div>
            <div className="flex justify-between">
              <p className="text-end text-xl smtrace:mt-4">
                {upcomingEventsLocale.offerOptions[0].price}
              </p>
              <BookNowButton />
            </div>
            <p className="text-center">
              {upcomingEventsLocale.offerOptions[0].description}
            </p>
          </div>
        </div>
      </>
    );
  } else if (upcomingEventsLocale.offerOptions.length === 2) {
    const divClass =
      "mx-auto flex sm:w-full sm:flex-col sm:w-1/3 sm:px-3 md:px-5";
    return (
      <>
        <div
          className={`max-sm:flex ${divClass} border-dark dark:border-light max-sm:flex sm:border-r`}
        >
          <div className={`max-sm:w-1/2 sm:h-full`}>
            <OfferInfo room={upcomingEventsLocale.offerOptions[0]} />
          </div>
          <div className="max-sm:w-1/2 sm:hidden">
            <OfferInfo room={upcomingEventsLocale.offerOptions[1]} />
          </div>
        </div>
        <p className={`${divClass}`}>{upcomingEventsLocale.description}</p>
        <div
          className={`${divClass} border-dark dark:border-light max-sm:hidden sm:border-l `}
        >
          <OfferInfo room={upcomingEventsLocale.offerOptions[1]} />
        </div>
      </>
    );
  }
};
