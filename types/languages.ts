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
  default?: Locale;
};

export const defaultLanguage: LocaleDetails = {
  path: "en-CA",
  region: Region.Canada,
  regionCode: RegionCode.Canada,
  language: "English",
  languageCode: Language.English,
};

// All possible locales are corresponding to all Locale values, don't hardcode it
export const possibleLocales: Locale[] = Object.values(Language).flatMap(
  (lang) =>
    Object.values(RegionCode).map((region) => `${lang}-${region}` as Locale),
);
