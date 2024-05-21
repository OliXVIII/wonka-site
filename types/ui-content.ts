import { Language, Locale } from "./languages";

export type Menu = {
  title: string;
  path: string;
};

export type UiContent = {
  compagnyName: string;
  description: string;
  mission: string;
  navigation: Menu[];
  siteName: string;
};

export const local108UIContent: Record<Language, UiContent> = {
  // English
  en: {
    compagnyName: "Local 108 Inc.",
    description: "Local 108 Description",
    mission: "Local 108 Mission",
    siteName: "Local 108",
    navigation: [
      { title: "About", path: "/about" },
      { title: "Contact", path: "/contact" },
      { title: "Services", path: "/services" },
    ],
  },
  // French
  fr: {
    compagnyName: "Local 108 Inc.",
    description: "Local 108 Description",
    mission: "Local 108 Mission",
    siteName: "Local 108",
    navigation: [
      { title: "À propos", path: "/about" },
      { title: "Contact", path: "/contact" },
      { title: "Services", path: "/services" },
    ],
  },
};
