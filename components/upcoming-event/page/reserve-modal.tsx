"use client";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export const ReserveModal = () => {
  const searchParams = useSearchParams();
  const modal = searchParams.get("reserve-modal");
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null) as React.RefObject<HTMLDialogElement> | null;

  useEffect(() => {
    if (modal) {
      setOpen(true);
    }
  }, [modal]);

  useEffect(() => {
    if (open) {
      // Close modal when clicking outside of it
      const handleOutsideClick = () => {
        modalRef?.current?.close();
      };

      document.addEventListener("click", handleOutsideClick);

      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
    }
  }, [open]);

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      {modal && (
        <dialog
          className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur"
          ref={modalRef}
        >
          <div className="mx-auto max-w-lg rounded-lg bg-white p-8 shadow-xl">
            <div className="font-sans text-base font-normal leading-tight text-black">
              <div className="flex flex-col">
                <div className="mb-6 flex flex-wrap items-baseline justify-between gap-8">
                  <span className="mr-8 text-xl font-bold">
                    409$ CAD&nbsp;
                    <span className="text-sm font-normal">par nuit</span>
                  </span>
                  <span className="text-sm font-normal">409$ CAD par nuit</span>
                </div>
                {/* Your form elements here */}
                <div className="mb-4 flex flex-col">
                  <label className="mb-2 text-sm font-semibold" htmlFor="name">
                    Nom complet
                  </label>
                  <input
                    className="rounded-lg border border-gray-300 px-3 py-2"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Votre nom complet"
                  />
                </div>
                <div className="mb-4 flex flex-col">
                  <label className="mb-2 text-sm font-semibold" htmlFor="email">
                    Adresse email
                  </label>
                  <input
                    className="rounded-lg border border-gray-300 px-3 py-2"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Votre adresse email"
                  />
                </div>
                {/* Additional form fields */}
              </div>
              <div className="mt-6">
                <button
                  className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                  onClick={handleCloseModal}
                >
                  Réserver
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};
