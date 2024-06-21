"use client";

import { MenuContent } from "@/types/ui-content";
import { useEffect, useRef, RefObject } from "react";
import { LocaleDetails } from "@/types/languages";
import { signOut, useSession } from "next-auth/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ProfileItem } from "./profile-item";

// TODO: Make it work for contact us

export const useOutsideClickClose = (
  dialogRef: RefObject<HTMLDialogElement>,
  outsideRef: RefObject<HTMLFormElement>,
) => {
  useEffect(() => {
    if (dialogRef.current?.open) {
    document.addEventListener("click", () => dialogRef?.current?.close());
    }
  });
};

type ProfileModalProps = {
  menu: MenuContent[];
  domain: string;
  admin?: boolean;
};

export const ProfileModal = ({ domain, menu }: ProfileModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null); // Assign a valid RefObject<HTMLDialogElement> value to modalRef
  const outsideRef = useRef<HTMLFormElement>(null); // Assign a valid RefObject<HTMLFormElement> value to outsideRef
  const { data: session } = useSession();
  useOutsideClickClose(modalRef, outsideRef);
  // svg => fill-light fill-dark
  return (
    <>
      <dialog
        ref={modalRef}
        className="mr-5 mt-16 shadow-profile shadow-dark dark:shadow-light dark:bg-dark-light bg-light rounded-lg"
      >
        {/* <button
          className="flex h-11 w-11 items-center pb-2 pl-2"
          onClick={() => modalRef.current?.close()}
          aria-label="Close mobile menu"
        >
          <XMarkIcon className="h-6 w-6" />
        </button> */}
        <ProfileItem domain={domain}/>
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
