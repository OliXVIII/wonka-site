"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { UpcomingEvent } from "@/types/upcoming-event";

export const ImageModale = ({
  upComingEvent,
}: {
  upComingEvent: UpcomingEvent;
}) => {
  //Adding #index=index to the URL
  const path = usePathname();
  const index = path.includes("#index=")
    ? (path.split("#index=")[1] as unknown as number)
    : null;
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
        className="m-auto bg-light p-8"
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
