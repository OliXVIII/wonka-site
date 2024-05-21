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

export const demoUIContent: Record<Language, UiContent> = {
  // English
  en: {
    compagnyName: "Demo Company",
    siteName: "Demo Site",
    mission: "My Mission for this demo site is to show how to use i18n",
    description: "My Description: This is a demo site to show how to use i18n",
    navigation: [
      { title: "Home", path: "/" },
      { title: "About", path: "/about" },
      { title: "Contact", path: "/contact" },
    ],
  },
  // French
  fr: {
    compagnyName: "Compagnie de démonstration",
    siteName: "Site de démonstration",
    mission:
      "Ma mission pour ce site de démonstration est de montrer comment utiliser i18n",
    description:
      "Ma description: Ceci est un site de démonstration pour montrer comment utiliser i18n",
    navigation: [
      { title: "Accueil", path: "/" },
      { title: "À propos", path: "/about" },
      { title: "Contact", path: "/contact" },
    ],
  },
};

export const local108UIContent: Record<Language, UiContent> = {
  // English
  en: {
    compagnyName: "Local 108 Inc.",
    description: "Local 108 Description",
    mission: "Local 108 Mission",
    siteName: "Local 108",
    navigation: [
      { title: "Home", path: "/" },
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
      { title: "Accueil", path: "/" },
      { title: "À propos", path: "/about" },
      { title: "Contact", path: "/contact" },
      { title: "Services", path: "/services" },
    ],
  },
};
