"use client";
import { priceByCountry } from "@/lib/price-by-country";
import { taxByCountry } from "@/lib/tax";
import { sendEmail } from "@/server/send-email";
import { MenuContent, UiContent } from "@/types/ui-content";
import { Offer, UpcomingEvent } from "@/types/upcoming-event";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, RefObject, useState } from "react";
import { ModalButton } from "./modal-button";
import { RowImages } from "./row-images";
import { LocaleDetails } from "@/types/languages";
import { signOut, useSession } from "next-auth/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

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
      }
    }
  });
};

type ProfileModalProps = {
  menu: MenuContent[];
  locale: LocaleDetails;
};

export const ProfileModal = ({ menu, locale }: ProfileModalProps) => {
  const searchParams = useSearchParams();
  const modal = searchParams.get("profile-modal");
  const modalRef = useRef<HTMLDialogElement>(null); // Assign a valid RefObject<HTMLDialogElement> value to modalRef
  const outsideRef = useRef<HTMLFormElement>(null); // Assign a valid RefObject<HTMLFormElement> value to outsideRef
  const { data: session } = useSession();
  useOutsideClickClose(modalRef, outsideRef);

  return (
    <>
      <dialog ref={modalRef}>
        <button
          className="mb-4 flex h-11 w-11 items-center justify-center rounded-md transition-colors"
          onClick={() => modalRef.current?.close()}
          aria-label="Close mobile menu"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="h-96 w-96 transform rounded-lg bg-white">
          Profile
          <div className="m-auto">
            <div className="mb-4">
              <strong className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Name:
              </strong>
              <span className="text-sm  ">{session?.user?.name}</span>
            </div>
            <div className="mb-4">
              <strong className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email:
              </strong>
              <span className="text-sm  ">
                {session?.user?.email}
              </span>
            </div>
            <div className="mb-4">
              <strong className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Authorization Level:
              </strong>
              <span className="text-sm  ">admin ou non</span>
            </div>
          </div>
          <div className="mt-4 justify-end">
            <button
              onClick={() => signOut()}
              className="rounded-lg border border-black bg-red-400 px-5 py-1"
            >
              Sign Out
            </button>
          </div>
        </div>
      </dialog>

      <button
        onClick={() => modalRef.current?.showModal()}
        aria-label="Profile modal"
        className="flex h-10 w-10 items-center justify-center rounded-md"
      >
        <img
          src={session?.user?.image as string}
          className="object-fit z-40 h-10 w-10 rounded-full"
        />
      </button>
    </>
  );
};
