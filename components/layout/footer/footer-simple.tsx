import Link from "next/link";
import FooterMenu from "@/components/layout/footer/footer-menu";
import { DataType } from "@/server/fetch-data";
import Image from "next/image";
import { LocaleDetails } from "@/types/languages";

type FooterProps = {
  data: DataType;
  locale: LocaleDetails;
};

export default async function FooterSimple({
  locale,
  data,
}: Readonly<FooterProps>) {
  const { uiContent, storage } = data;
  const menu = await uiContent.footer.navigation;
  const midpoint = menu.length / 2;
  const firstHalfMenu = menu.slice(0, midpoint);
  const secondHalfMenu = menu.slice(midpoint);

  return (
    <div className="flex w-full py-5 max-sm:flex-grow max-sm:flex-wrap max-sm:justify-center md:justify-between">
      <FooterMenu locale={locale} menu={firstHalfMenu} />
      {storage.logo?.logoTitle ? (
        <div className="flex max-sm:hidden md:w-1/3 md:pt-1">
          <Link href="/" className="relative my-auto h-[80%] max-h-40 w-full">
            <Image
              src={storage.logo.logoTitle.src}
              alt="logo"
              fill
              className="object-contain dark:invert-[90%]"
            />
          </Link>
        </div>
      ) : null}
      <FooterMenu locale={locale} menu={secondHalfMenu} />
    </div>
  );
}
