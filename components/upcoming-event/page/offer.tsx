import { Offer, UpcomingEvent } from "@/types/upcoming-event";
import { BookNowButton } from "./book-now";
import { UiContent } from "@/types/ui-content";
import { taxByCountry } from "@/lib/tax";
import { RegionCode } from "@/types/region";

const addDollarSignByCountry = (
  price: number | string,
  country: RegionCode,
) => {
  if (country === "CA") {
    return `${price}$`;
  } else if (country === "US") {
    return `$${price}`;
  }
  return `${price}`;
};

const OfferInfo = ({
  room,
  uiContent,
  mobile,
}: {
  room: Offer;
  uiContent: UiContent;
  mobile?: boolean;
}) => {
  const tax = (room.price * taxByCountry.CA.Quebec) / 100;
  const total = room.price + tax;
  return (
    <div
      key={room.title}
      className={
        "flex h-full min-h-72 flex-col rounded-box p-1 py-2 shadow-sm dark:shadow-inner dark:shadow-white max-md:w-1/2 max-md:shadow-md sm:m-2 sm:py-4" +
        (mobile ? " max-sm:ml-4 md:hidden" : "")
      }
    >
      <div className="justify-around">
        <h3 className="text-xlæ text-center">{room.title}</h3>
        <p className="text-center text-base">
          ({room.quantity} {uiContent.available})
        </p>
      </div>
      <p className="flex flex-grow flex-col justify-center text-center">
        {room.description}
      </p>
      <div className="flex flex-col justify-center pb-4 pt-2">
        <p className="text-center text-xl">
          {addDollarSignByCountry(total.toFixed(2), "CA" as RegionCode)}
        </p>
        <p className="text-center text-xs">
          {addDollarSignByCountry(room.price.toFixed(1), "CA" as RegionCode)} +{" "}
          {addDollarSignByCountry(tax.toFixed(2), "CA" as RegionCode)} (taxes)
        </p>
      </div>
      <BookNowButton bookNow={uiContent.bookNow} />
    </div>
  );
};

export const OfferComponent = ({
  upcomingEventsLocale,
  uiContent,
}: {
  upcomingEventsLocale: UpcomingEvent;
  uiContent: UiContent;
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
          <OfferInfo
            room={upcomingEventsLocale.offerOptions[0]}
            uiContent={uiContent}
          />
        </div>
      </>
    );
  } else if (upcomingEventsLocale.offerOptions.length === 2) {
    const divClass = "mx-auto flex md:flex-col md:w-1/3 sm:px-3 md:px-5";
    return (
      <>
        <div
          className={`max-md:flex ${divClass} border-dark dark:border-light max-md:mb-8 max-md:w-full md:border-r`}
        >
          <OfferInfo
            room={upcomingEventsLocale.offerOptions[0]}
            uiContent={uiContent}
          />
          <OfferInfo
            room={upcomingEventsLocale.offerOptions[1]}
            uiContent={uiContent}
            mobile
          />
        </div>
        <p className={`${divClass} my-auto`}>
          {upcomingEventsLocale.description}
        </p>
        <div
          className={`${divClass} border-dark dark:border-light max-md:hidden sm:border-l`}
        >
          <OfferInfo
            room={upcomingEventsLocale.offerOptions[1]}
            uiContent={uiContent}
          />
        </div>
      </>
    );
  }
};
