import { UiContent } from "@/types/ui-content";

export const ReadMoreButton = ({
  readMore,
  dark,
  alignBottomRight,
}: {
  readMore: UiContent["readMore"];
  dark?: boolean;
  alignBottomRight?: boolean;
}) => {
  return (
    <button
      className={`absolute z-10 w-fit rounded-full border-2 px-4 py-1 font-bold transition-colors ${!dark ? "border-light text-light" : " border-dark text-dark"} ${alignBottomRight ? "bottom-4 right-4" : "left-5 top-5"}`}
    >
      {readMore}
    </button>
  );
};
