import Arrow from "@/public/arrow.svg";

export const BookNowButton = () => {
  return (
    <button className="m-auto flex whitespace-nowrap rounded-full border border-dark px-4 pb-1.5 pt-2 font-bold dark:border-light">
      <span className="-mt-0.5 ml-2 h-7 w-7 rounded-full bg-white fill-black">
        <Arrow />
      </span>
    </button>
  );
};
