"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useRef, RefObject } from "react";

import { StaticUiContent } from "@/types/static-ui-content";
import { UiContent } from "@/types/ui-content";

import { ProfileItem } from "./profile-item";

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
  const outsideRef = useRef<HTMLFormElement>(null); // Assign a valid RefObject<HTMLFormElement> value to outsideRef
  const { data: session } = useSession();
  useOutsideClickClose(modalRef, outsideRef);
  // svg => fill-light fill-dark
  return (
    <>
      <dialog
        ref={modalRef}
        className="mr-5 mt-16 rounded-lg bg-light shadow-profile dark:bg-dark-light"
      >
        <ProfileItem uiContent={uiContent} staticUiContent={staticUiContent} />
      </dialog>

      <button
        onClick={() => modalRef.current?.showModal()}
        aria-label="Profile modal"
        className="relative flex h-10 w-10 items-center justify-center rounded-md"
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
