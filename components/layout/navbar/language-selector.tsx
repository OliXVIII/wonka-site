import { LocaleDetails } from "@/types/languages";

type LanguageSelectorProps = {
  nextLocale: LocaleDetails;
  slug: string;
};

export const LanguageSelector = ({
  nextLocale,
  slug,
}: LanguageSelectorProps) => {
  // get full path of the page in nextjs server side

  return (
    <a href={"/" + nextLocale.path + "/" + slug} className="m-auto uppercase">
      {nextLocale.languageCode}
    </a>
  );
};
