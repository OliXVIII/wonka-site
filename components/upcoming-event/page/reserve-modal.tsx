"use client";
import { priceByCountry } from "@/lib/price-by-country";
import { taxByCountry } from "@/lib/tax";
import { UiContent } from "@/types/ui-content";
import { UpcomingEvent } from "@/types/upcoming-event";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, RefObject, useState } from "react";

// TODO: Make it work for contact us

export const useOutsideClickClose = (
  dialogRef: RefObject<HTMLDialogElement>,
  outsideRef: RefObject<HTMLDivElement>,
) => {
  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
    function handleClickOutside(event: MouseEvent) {
      // Test if click outside
      if (
        outsideRef.current &&
        !outsideRef.current.contains(event.target as Node) &&
        dialogRef.current
      ) {
        dialogRef.current.close();
        // Remove the reserve-modal query parameter
        const url = new URL(window.location.href);
        url.searchParams.delete("reserve-modal");
        window.history.replaceState({}, "", url.toString());
      }
    }
  });
};

export const ReserveModal = ({
  upcomingEvent,
  uiContent,
}: {
  upcomingEvent: UpcomingEvent;
  uiContent: UiContent;
}) => {
  const searchParams = useSearchParams();
  const modal = searchParams.get("reserve-modal");
  const selected = (searchParams.get("selected") as unknown as number) ?? 0;
  const modalRef = useRef<HTMLDialogElement>(null); // Assign a valid RefObject<HTMLDialogElement> value to modalRef
  const outsideRef = useRef<HTMLDivElement>(null); // Assign a valid RefObject<HTMLDivElement> value to outsideRef
  const [submit, setSubmit] = useState<string>(
    uiContent.form?.submit ?? "Submit",
  );

  useOutsideClickClose(modalRef, outsideRef);

  const offer =
    upcomingEvent.offerOptions?.[selected] ?? upcomingEvent.offerOptions?.[0];
  if (!offer) {
    return null;
  }

  const tax = (offer?.price * taxByCountry.CA.Quebec) / 100;
  const total = offer?.price + tax;

  const handleCloseModal = async () => {
    if (modalRef.current !== null) {
      setSubmit(uiContent.form?.submitSuccess ?? "Success");

      await new Promise((resolve) => setTimeout(resolve, 5000));

      modalRef.current.close();
      // Remove the reserve-modal query parameter
      const url = new URL(window.location.href);
      url.searchParams.delete("reserve-modal");
      window.history.replaceState({}, "", url.toString());
    }
  };

  return (
    <>
      {modal && (
        <dialog
          className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-50 px-4 backdrop-blur"
          ref={modalRef}
        >
          <div
            className="mx-auto max-w-lg rounded-lg bg-white p-8 shadow-xl max-xs:w-full xs:min-w-[70%] md:min-w-[40%]"
            ref={outsideRef}
          >
            <div className="font-sans text-base font-normal leading-tight text-black">
              <div className="flex flex-col">
                <div className="mb-6 flex flex-wrap items-baseline justify-between gap-8">
                  <span className="text-xl font-bold">{offer.title}</span>
                  <span className="mr-8 text-xl font-bold">
                    {priceByCountry(total)}
                  </span>
                </div>
                {/* Your form elements here */}
                <div className="mb-4 flex flex-col">
                  <label className="mb-2 text-sm font-semibold" htmlFor="name">
                    {uiContent.form?.name}
                  </label>
                  <input
                    className="rounded-lg border border-gray-300 px-3 py-2"
                    type="text"
                    id="name"
                    name="name"
                    placeholder={uiContent.form?.name}
                  />
                </div>
                <div className="mb-4 flex flex-col">
                  <label className="mb-2 text-sm font-semibold" htmlFor="email">
                    {uiContent.form?.email}
                  </label>
                  <input
                    className="rounded-lg border border-gray-300 px-3 py-2"
                    type="email"
                    id="email"
                    name="email"
                    placeholder={uiContent.form?.email}
                  />
                </div>
                <div className="mb-4 flex flex-col">
                  <label
                    className="mb-2 text-sm font-semibold"
                    htmlFor="phone-number"
                  >
                    {uiContent.form?.phone}
                  </label>
                  <input
                    className="rounded-lg border border-gray-300 px-3 py-2"
                    type="tel"
                    id="phone-number"
                    name="phone-number"
                    placeholder={uiContent.form?.phone}
                  />
                </div>
                <div className="mb-4 flex flex-col">
                  <label
                    className="mb-2 text-sm font-semibold"
                    htmlFor="message"
                  >
                    {uiContent.form?.message}
                  </label>
                  <textarea
                    className="rounded-lg border border-gray-300 px-3 py-2"
                    id="message"
                    name="message"
                    placeholder=""
                  />
                </div>
                {/* Additional form fields */}
              </div>
              <div className="mt-6 text-center">
                <button
                  className={
                    "rounded-full bg-red-700 px-8 py-2 font-bold text-white transition-colors hover:bg-red-800" +
                    (submit === uiContent.form?.submitSuccess ||
                    submit !== uiContent.form?.submit
                      ? " duration-[5000ms] animate-pulse !bg-blue-700 ease-in hover:!bg-blue-800"
                      : "")
                  }
                  onClick={handleCloseModal}
                >
                  {submit}
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};
