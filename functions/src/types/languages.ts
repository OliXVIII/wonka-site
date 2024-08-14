export enum Language {
  English = 'en',
  French = 'fr',
  Mandarin = 'zh',
}

export type Locale = `${Language}`;

export type LocaleDetails = {
  path: Locale;
  language: string;
  languageCode: Language;
  nextLanguage?: Locale;
  default?: Locale;
};

export const localesDetails: Record<Locale, LocaleDetails> = {
  en: {
    path: 'en',
    language: 'English',
    languageCode: Language.English,
  },
  fr: {
    path: 'fr',
    language: 'French',
    languageCode: Language.French,
  },
  zh: {
    path: 'zh',
    language: 'Mandarin',
    languageCode: Language.Mandarin,
  },
};

export const defaultLocale: LocaleDetails = {
  path: 'en',
  language: 'English',
  languageCode: Language.English,
  default: 'en-CA' as Locale,
};

export const isValidLanguage = (lang: string): boolean => {
  return Object.values(Language).includes(lang as Language);
};
