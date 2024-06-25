"use client";
import { priceByCountry } from "@/lib/price-by-country";
import { taxByCountry } from "@/lib/tax";
import { sendEmail } from "@/server/send-email";
import { UiContent } from "@/types/ui-content";
import { Offer, UpcomingEvent } from "@/types/upcoming-event";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, RefObject, useState } from "react";
import { ModalButton } from "./modal-button";
import { RowImages } from "./row-images";
import { LocaleDetails } from "@/types/languages";

// TODO: Make it work for contact us

export const useOutsideClickClose = (
  dialogRef: RefObject<HTMLDialogElement>,
  outsideRef: RefObject<HTMLFormElement>,
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
  locale,
}: {
  upcomingEvent: UpcomingEvent;
  uiContent: UiContent;
  locale: LocaleDetails;
}) => {
  const searchParams = useSearchParams();
  const modal = searchParams.get("reserve-modal");
  const selected = (searchParams.get("selected") as unknown as number) ?? 0;
  const modalRef = useRef<HTMLDialogElement>(null); // Assign a valid RefObject<HTMLDialogElement> value to modalRef
  const outsideRef = useRef<HTMLFormElement>(null); // Assign a valid RefObject<HTMLFormElement> value to outsideRef
  const [text, setText] = useState<string>(uiContent.checkout);

  useOutsideClickClose(modalRef, outsideRef);

  const offer =
    upcomingEvent.offerOptions?.[selected] ?? upcomingEvent.offerOptions?.[0];
  if (!offer) {
    return null;
  }

  const tax = (offer?.price * taxByCountry.CA.Quebec) / 100;
  const total = offer?.price + tax;

  const handleSubmitEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    if (modalRef.current !== null) {
      // List of email addresses to send the email to (admin's email)
      const adminEmails = ["ncastonguay01@gmail.com"];

      // Open a window in an other tab
      //TODO: Add quantity
      window.open(
        `${offer.stripe}?locale=${locale.languageCode.toLocaleLowerCase()}`,
        "_blank",
      );
      event.preventDefault(); // Prevent default form submission behavior
      setText(uiContent.checkoutAfter);

      // Retrieve form data
      const userData = {
        name: (
          event.currentTarget.elements.namedItem("name") as HTMLInputElement
        ).value,
        email: (
          event.currentTarget.elements.namedItem("email") as HTMLInputElement
        ).value,
        phone: (
          event.currentTarget.elements.namedItem("phone") as HTMLInputElement
        ).value,
        people: (
          event.currentTarget.elements.namedItem("people") as HTMLInputElement
        ).value,
        message: (
          event.currentTarget.elements.namedItem(
            "message",
          ) as HTMLTextAreaElement
        ).value,
      };

      const emailContent = {
        to: adminEmails.join(", "),
        subject: "New Reservation Notification",
        body: `A new reservation has been made:\n\nReservation Details:\nTitle: ${offer.title}\nDescription: ${offer.description}\nPrice: ${offer.price}\nAmount of people in the reservation: ${userData.people}\n\nUser Details:\nName: ${userData.name}\nEmail: ${userData.email}\nPhone: ${userData.phone}`,
      };

      // Send the email
      sendEmail(emailContent);

      // Simulate a delay for demonstration purposes
      await new Promise((resolve) => setTimeout(resolve, 120000));

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
          <form
            className="relative mx-auto flex max-w-lg justify-center rounded-lg bg-light p-8 shadow-xl max-sm:p-6 max-xs:w-full xs:min-w-[70%] xl:min-w-[60%] 2xl:min-w-[50%]"
            ref={outsideRef}
            onSubmit={handleSubmitEmail}
          >
            <RowImages upcomingEventsLocale={upcomingEvent} vertical />
            <div className="max-w-full font-sans text-base font-normal leading-tight text-black lg:px-[2%]">
              <div className="flex flex-col">
                <div className="mb-6 flex flex-wrap items-baseline justify-between">
                  <span className="pr-3 text-xl font-bold">{offer.title}</span>
                  <span className="mr-3 w-full text-end text-xl font-bold">
                    {priceByCountry(total)}
                  </span>
                </div>
                {/* Your form elements here */}
                <div className=" mb-2 flex flex-col">
                  <label className="mb-2 text-sm font-semibold" htmlFor="name">
                    {uiContent.form?.name}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="rounded-lg border border-gray-300 px-3 py-1.5"
                    id="name"
                    name="name"
                    placeholder={uiContent.form?.name}
                    required
                    type="text"
                  />
                </div>
                <div className=" mb-2 flex flex-col">
                  <label className="mb-2 text-sm font-semibold" htmlFor="email">
                    {uiContent.form?.email}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="rounded-lg border border-gray-300 px-3 py-2 max-sm:py-1.5"
                    id="email"
                    name="email"
                    placeholder={uiContent.form?.email}
                    required
                    type="email"
                  />
                </div>
                <div className=" mb-2 flex flex-col">
                  <label
                    className="mb-2 text-sm font-semibold"
                    htmlFor="phone-number"
                  >
                    {uiContent.form?.phone}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="rounded-lg border border-gray-300 px-3 py-2 max-sm:py-1.5"
                    id="phone"
                    name="phone"
                    placeholder={uiContent.form?.phone}
                    required
                    type="tel"
                  />
                </div>
                {/* <div className=" flex flex-col mb-2">
                  <label
                    className="mb-2 text-sm font-semibold"
                    htmlFor="people"
                  >
                    {uiContent.form?.people}
                  </label>
                  <input
                    className="rounded-lg border border-gray-300 px-3 py-2 max-sm:py-1.5"
                    id="people"
                    name="people"
                    placeholder={uiContent.form?.people}
                    defaultValue="1"
                    required
                    type="number"
                  />
                </div> */}
                {/* Custom fields, food preference: Vegan, .. and allergies:  */}
                {uiContent.form?.foodPreferences &&
                  uiContent.form?.allergies && (
                    <div className="flex justify-around max-xs:flex-col">
                      <div className=" mb-2 flex flex-col">
                        <label
                          className="mb-2 text-sm font-semibold"
                          htmlFor="food-preference"
                        >
                          {uiContent.form?.foodPreferences}
                        </label>
                        <input
                          className="mr-1 rounded-lg border border-gray-300 px-3 py-2 max-sm:py-1.5"
                          id="food-preference"
                          name="food-preference"
                          placeholder="Ex: Vegan, etc."
                        />
                      </div>
                      <div className=" mb-2 flex flex-col">
                        <label
                          className="mb-2 text-sm font-semibold"
                          htmlFor="allergies"
                        >
                          {uiContent.form?.allergies}
                        </label>
                        <input
                          className="ml-1 rounded-lg border border-gray-300 px-3 py-2 max-sm:py-1.5"
                          id="allergies"
                          name="allergies"
                          placeholder={uiContent.form?.allergies}
                        />
                      </div>
                    </div>
                  )}

                <div className=" mb-2 flex flex-col max-sm:hidden">
                  <label
                    className="mb-2 text-sm font-semibold"
                    htmlFor="message"
                  >
                    {uiContent.form?.message}
                  </label>
                  <textarea
                    className="rounded-lg border border-gray-300 px-3 py-2 max-sm:py-1.5"
                    id="message"
                    name="message"
                    placeholder={uiContent.form?.message}
                  />
                </div>
                {/* Additional form fields */}
              </div>

              <div className="mt-6 flex justify-center text-center">
                <button
                  className={
                    "rounded-full bg-green-700 px-12 py-2 font-bold text-light transition-colors hover:bg-green-800 max-lg:px-8 max-sm:py-1.5"
                  }
                  type="submit"
                >
                  {text}
                </button>
              </div>
            </div>{" "}
            <button
              className="absolute right-4 top-4 text-3xl"
              onClick={() => {
                modalRef.current?.close();
                const url = new URL(window.location.href);
                url.searchParams.delete("reserve-modal");
                window.history.replaceState({}, "", url.toString());
              }}
            >
              X
            </button>
          </form>
        </dialog>
      )}
    </>
  );
};
