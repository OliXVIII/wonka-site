import { DataType } from "@/server/fetch-data";
import { UiContent } from "@/types/ui-content";
import Image from "next/image";

type HeaderProps = {
  data: DataType;
};

export const Header = ({ data }: HeaderProps) => {
  const { uiContent, storage } = data;
  const { slogan, slogan2, mission, siteName } = uiContent as UiContent;

  return (
    <header className="flex h-[69vh] flex-col items-center justify-center px-8 py-4 max-sm:h-[80vh]">
      <h1 className="z-10 mt-12 text-center max-sm:ml-auto sm:items-center">
        {slogan}
        {slogan2 ? <br /> : null}
        {slogan2 ? slogan2 : null}
      </h1>
      <div className="relative flex h-96 gap-4 max-sm:w-full max-sm:flex-col">
        <div className="mx-sm:justify-start mt-8 text-white sm:mt-auto">
          <div className="flex">
            <Image
              src="https://magicmind.com/cdn/shop/t/124/assets/icon__star.svg?v=120442338273074558271675182957"
              alt="rating star icon #1"
              width="20"
              height="20"
              className="mr-2"
            />
            <Image
              src="https://magicmind.com/cdn/shop/t/124/assets/icon__star.svg?v=120442338273074558271675182957"
              alt="rating star icon #2"
              width="20"
              height="20"
              className="mr-2"
            />
            <Image
              src="https://magicmind.com/cdn/shop/t/124/assets/icon__star.svg?v=120442338273074558271675182957"
              alt="rating star icon #3"
              width="20"
              height="20"
              className="mr-2"
            />
            <Image
              src="https://magicmind.com/cdn/shop/t/124/assets/icon__star.svg?v=120442338273074558271675182957"
              alt="rating star icon #4"
              width="20"
              height="20"
              className="mr-2"
            />
            <Image
              src="https://magicmind.com/cdn/shop/t/124/assets/icon__star.svg?v=120442338273074558271675182957"
              alt="rating star icon #5"
              width="20"
              height="20"
              className="mr-2"
            />
          </div>
          <h2 className="mt-4 text-2xl font-semibold">{siteName}</h2>
          <p className="my-auto mt-2 w-48">&quot;{mission}&quot;</p>
        </div>

        {storage.header?.src ? (
          <div className="relative flex max-sm:my-1 max-sm:h-[60vw] sm:mx-3 sm:h-72 sm:w-72 md:mx-14 lg:mx-28">
            <Image
              src={storage.header?.src}
              alt="logo header"
              fill
              style={{ transform: `scale(${storage.header.aspectRatio ?? 1})` }}
              className={`max-w-[100vw] object-contain dark:invert-[90%] max-sm:!scale-100`}
            />
          </div>
        ) : null}
        <button className="bg-dark dark:bg-light text-light dark:text-dark my-auto mt-16 h-12 w-36 rounded-md hover:bg-green-700 max-sm:ml-auto max-sm:mt-0 max-sm:h-28 max-xs:h-16">
          Get Started
        </button>
      </div>
    </header>
  );
};
