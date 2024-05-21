import clsx from "clsx";
import { StorageType } from "@/types/storage";
import Image from "next/image";

type LogoSquareProps = {
  storage: StorageType;
  size?: "sm" | undefined;
};

export default function LogoSquare({ storage, size }: LogoSquareProps) {
  return (
    <div
      className={clsx("relative flex flex-none items-center justify-center ", {
        "h-14 w-14 rounded-xl": !size,
        "h-[30px] w-[30px] rounded-lg": size === "sm",
      })}
    >
      {/* <LogoIcon
        className={clsx({
          "h-[16px] w-[16px]": !size,
          "h-[10px] w-[10px]": size === "sm",
        })}
      /> */}
      <Image
        src={storage.logo.navbar.src}
        alt="logo"
        fill
        style={{ transform: `scale(${storage.logo.navbar.aspectRatio ?? 1})` }}
        className="object-contain dark:invert-[90%]"
      />
    </div>
  );
}
