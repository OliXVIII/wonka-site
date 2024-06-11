import Arrow from "@/public/arrow.svg";
import Link from "next/link";

export const BookNowButton = ({ bookNow }: { bookNow?: string }) => {
  return (
    <button className="m-auto flex w-fit justify-between whitespace-nowrap rounded-full bg-dark px-4 pb-1.5 pt-2 font-bold text-light dark:bg-light dark:text-dark max-xs:px-2 max-xs:text-sm max-xxs:text-xs">
      {bookNow ?? "Book now"}
      <span className="-mt-0.5 ml-2 h-7 w-7 rounded-full fill-light dark:fill-dark max-xl:hidden">
        <Arrow />
      </span>
    </button>
  );
};
