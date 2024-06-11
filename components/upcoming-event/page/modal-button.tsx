"use client";

import { UiContent } from "@/types/ui-content";
import { useState } from "react";

export const ModalButton = ({ uiContent }: { uiContent: UiContent }) => {
  const [text, setText] = useState<string>(uiContent.checkout);
  return (
    <div className="mt-6 flex justify-center text-center">
      <button
        className={
          "rounded-full bg-green-700 px-12 py-2 font-bold text-light transition-colors hover:bg-green-800 max-lg:px-8"
        }
        onClick={() => setText(uiContent.checkoutAfter)}
      >
        {text}
      </button>
    </div>
  );
};
