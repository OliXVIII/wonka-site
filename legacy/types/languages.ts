import { Region, RegionCode } from "./region";

export enum Language {
  English = "en",
  French = "fr",
}

export type Locale = `${Language}-${RegionCode}`;

export type LocaleDetails = {
  path: Locale;
  region: Region;
  regionCode: RegionCode;
  language: string;
  languageCode: Language;
  nextLanguage?: Locale;
  default?: Locale;
};

export const localesDetails: Record<Locale, LocaleDetails> = {
  "en-CA": {
    path: "en-CA",
    region: Region.Canada,
    regionCode: RegionCode.Canada,
    language: "English",
    languageCode: Language.English,
    nextLanguage: "fr-CA" as Locale,
  },
  "fr-CA": {
    path: "fr-CA",
    region: Region.Canada,
    regionCode: RegionCode.Canada,
    language: "French",
    languageCode: Language.French,
    nextLanguage: "en-CA" as Locale,
  },
};

export const defaultLocale: LocaleDetails = {
  path: "en-CA",
  region: Region.Canada,
  regionCode: RegionCode.Canada,
  language: "English",
  languageCode: Language.English,
  default: "en-CA" as Locale,
};

// All possible locales are corresponding to all Locale values, don't hardcode it
export const possibleLocales: Locale[] = Object.values(Language).flatMap(
  (lang) =>
    Object.values(RegionCode).map((region) => `${lang}-${region}` as Locale),
);
