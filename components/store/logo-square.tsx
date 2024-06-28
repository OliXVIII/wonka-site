import clsx from "clsx";
import Image from "next/image";

import { StorageType } from "@/types/storage";

type LogoSquareProps = {
  storage: StorageType;
  size?: "sm" | undefined;
};

export default function LogoSquare({ storage, size }: LogoSquareProps) {
  return (
    <div
      className={clsx("relative flex flex-none items-center justify-center ", {
        "h-14 w-28": !size,
        "h-[30px] w-[30px] rounded-lg": size === "sm",
      })}
    >
      {/* <LogoIcon
        className={clsx({
          "h-[16px] w-[16px]": !size,
          "h-[10px] w-[10px]": size === "sm",
        })}
      /> */}
      {storage.logo.navbar ? (
        <Image
          src={storage.logo.navbar.src}
          alt="logo"
          fill
          quality={100}
          className="object-contain dark:invert-[88%]"
        />
      ) : null}
    </div>
  );
}
