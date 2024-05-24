import { LocaleDetails } from "@/types/languages";

type LanguageSelectorProps = {
  nextLocale: LocaleDetails;
};

export const LanguageSelector = ({ nextLocale }: LanguageSelectorProps) => {
  return (
    <a href={nextLocale.path} className="m-auto uppercase">
      {nextLocale.languageCode}
    </a>
  );
};
