"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useRef, RefObject } from "react";

import { StaticUiContent } from "@/types/static-ui-content";
import { UiContent } from "@/types/ui-content";

import { ProfileItem } from "./profile-item";

export const useOutsideClickClose = (
  dialogRef: RefObject<HTMLDialogElement>,
  outsideRef: RefObject<HTMLDivElement>,
  buttonRef: RefObject<HTMLButtonElement>,
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
      console.log(
        !outsideRef.current?.contains(event.target as Node),
        !buttonRef.current?.contains(event.target as Node),
      );
      if (
        !outsideRef.current?.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node) &&
        dialogRef.current
      ) {
        dialogRef.current.close();
      }
    }
  });
};

type ProfileModalProps = {
  uiContent: UiContent;
  domain: string;
  staticUiContent: StaticUiContent;
};
const ProfileModal = ({
  domain,
  uiContent,
  staticUiContent,
}: ProfileModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null); // Assign a valid RefObject<HTMLDialogElement> value to modalRef
  const outsideRef = useRef<HTMLDivElement>(null); // Assign a valid RefObject<HTMLFormElement> value to outsideRef
  const buttonRef = useRef<HTMLButtonElement>(null); // Assign a valid RefObject<HTMLButtonElement> value to buttonRef
  const { data: session } = useSession();
  useOutsideClickClose(modalRef, outsideRef, buttonRef);
  // svg => fill-light fill-dark
  return (
    <>
      <dialog
        ref={modalRef}
        className="mr-5 mt-16 rounded-lg bg-light shadow-profile dark:bg-dark-light"
      >
        <div className="flex h-full w-full p-2.5" ref={outsideRef}>
          <ProfileItem
            uiContent={uiContent}
            staticUiContent={staticUiContent}
          />
        </div>
      </dialog>

      <button
        onClick={() => modalRef.current?.showModal()}
        aria-label="Profile modal"
        className="relative flex h-10 w-10 items-center justify-center rounded-md"
        ref={buttonRef}
      >
        <Image
          alt="User Image"
          fill
          src={session?.user?.image as string}
          className="object-fit z-40 rounded-full"
          sizes="32px"
        />
      </button>
    </>
  );
};

export default ProfileModal;
