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
  footer: {
    legal: string;
    notice: string;
    navigation: Menu[];
    design: string;
    crafted: string;
    type: {
      map?: boolean;
      choice: "simple" | "navigational" | "interactive" | "noFooter";
    };
  };
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
    footer: {
      legal: "Local-108. All Rights Reserved.",
      notice: "*These statements have not been evaluated by the Yoga Administration.",
      navigation: [
        { title: "Privicy Policy", path: "" },
        { title: "Terms", path: "" },
        { title: "Blog", path: "" },
        { title: "Contact Us", path: "" },
      ],
      design: "Made in Quebec",
      crafted: "Crafted by",
      type: {
        map: true,
        choice: "simple",
      },
    },
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
    footer: {
      legal: "Local-108. Tous droits réservés.",
      notice: "*Ces déclarations n'ont pas été évaluées par l'Administration du Yoga.",
      navigation: [
        { title: "Politique de Confidentialité", path: "" },
        { title: "Conditions Générales", path: "" },
        { title: "Blog", path: "" },
        { title: "Contactez Nous", path: "" },
      ],
      design: "Créé au Québec",
      crafted: "Conçu par",
      type: {
        map: true,
        choice: "simple",
      },
    },
  },
};
