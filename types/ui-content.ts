import { Locale } from "./languages";

export interface Navigation {
  label: string;
  href: string;
}

export type UiContent = {
  logo: string;
  mission: string;
  description: string;
  // navigation: array of object with href and label
  navigation: Navigation[];
};

export const uiContent: Partial<Record<Locale, UiContent>> = {
  // English
  "en-CA": {
    logo: "My Logo",
    mission: "My Mission for this demo site is to show how to use i18n",
    description: "My Description: This is a demo site to show how to use i18n",
    navigation: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  // French
  "fr-CA": {
    logo: "Mon Logo",
    mission:
      "Ma mission pour ce site de démonstration est de montrer comment utiliser i18n",
    description:
      "Ma description: Ceci est un site de démonstration pour montrer comment utiliser i18n",
    navigation: [
      { label: "Accueil", href: "/" },
      { label: "À propos", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
};
