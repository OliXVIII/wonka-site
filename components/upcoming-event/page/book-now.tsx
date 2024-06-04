import Arrow from "@/public/arrow.svg";

export const BookNowButton = () => {
  return (
    <button className="flex whitespace-nowrap rounded-full px-4 py-2 font-bold text-white">
      Book Now
      <span className="-mt-0.5 ml-2 h-7 w-7 rounded-full bg-white fill-black">
        <Arrow />
      </span>
    </button>
  );
};
