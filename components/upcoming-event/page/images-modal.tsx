"use client";
import { UpcomingEvent } from "@/types/upcoming-event";
import Image from "next/image";
import { useEffect } from "react";

export const ImageModale = ({
  upComingEvent,
}: {
  upComingEvent: UpcomingEvent;
}) => {
  //Adding #index=index to the URL
  const index = new URLSearchParams(window.location.hash.substring(1)).get(
    "index",
  ) as unknown as number;
  // Make a hook that listens to url changes to detect if we add #index=index to the URL
  useEffect(() => {
    if (!index) {
      return;
    }

    const dialog = document.querySelector("dialog");
    if (!dialog) {
      return;
    }

    dialog.showModal();
  }, [index]);
  console.log(index);
  if (!upComingEvent.images || !index) {
    return null;
  }

  return (
    <dialog className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur">
      <button
        onClick={() =>
          window.history.pushState({}, "", window.location.pathname)
        }
        type="button"
        id="close"
        aria-label="close"
        className="m-auto bg-white p-8"
      >
        <div className="flex flex-col items-center">
          <Image
            alt={upComingEvent.title}
            src={upComingEvent.images[index].src}
            fill
            className="rounded-xl p-2.5"
          />
          <br />
          <p>{upComingEvent.images[index].alt}</p>
          <br />
        </div>
      </button>
    </dialog>
  );
};
