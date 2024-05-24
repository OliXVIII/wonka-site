import { Language, Locale } from "./languages";

export type MenuContent = {
  title: string;
  path: string;
  passHref?: boolean;
};
export type ServicesContent = {
  heading: string;
  services: {
    title: string;
    description: string;
    image: string;
  }[];
};

export type UiContent = {
  compagnyName: string;
  description: string;
  mission: string;
  navigation: MenuContent[];
  readMore: string;
  services?: ServicesContent;
  siteName: string;
  slogan: string;
  slogan2?: string;
};

export const local108UIContent: Record<Language, UiContent> = {
  // English
  en: {
    compagnyName: "Local 108 Inc.",
    description:
      "At Local 108, we do more than yoga. We are here to help you feel good, inside and out. Our yoga classes, nutrition advice, and wellness trips are designed for anyone looking to find balance between body and mind. We believe that taking care of your health is the key to living a happy and fulfilling life.",
    mission: "Our mission is to help you feel good, inside and out.",

    navigation: [
      { title: "About", path: "/about" },
      { title: "Services", path: "/services" },
      { title: "Blog", path: "/blog" },
      { title: "Store", path: "https://demo.vercel.store/", passHref: true },
    ],
    readMore: "Read More",
    services: {
      heading: "Our Services",
      services: [
        {
          title: "Yoga Classes",
          description:
            "Our yoga classes are designed to help you find balance between body and mind.",
          image:
            "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2F240_F_236453770_5YHNr9dPQS6DyIcVqTfKy9sVj3XW70Q2.jpg?alt=media&token=79025603-95a1-4b68-a85f-d5fa9f5ca755",
        },
        {
          title: "Nutrition Advice",
          description:
            "Our nutrition advice is designed to help you feel good inside and out.",
          image:
            "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2F240_F_764604426_Ao5PkHvrfldsrHcFPBXrRmW6stD0zXNi.jpg?alt=media&token=310af18b-33cc-4ebb-a51e-458bd8b0a351",
        },
        {
          title: "Wellness Trips",
          description:
            "Our wellness trips are designed to help you relax and recharge.",
          image:
            "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2FScreenshot%202024-05-22%20at%204.39.42%E2%80%AFPM.png?alt=media&token=2650c0bf-7e6a-46d8-ab17-b0f72a36d6c9",
        },
        {
          title: "Store",
          description:
            "Our store is designed to help you find the perfect yoga gear and snacks.",
          image:
            "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2F240_F_593679702_X5zCr4jmAjutz52YsUsyX4eyZwpAHZQc.jpg?alt=media&token=72e29ac6-e037-4b9b-8931-561a8439c708",
        },
      ],
    },
    siteName: "Local 108",
    slogan: "Feel Good, Inside and Out",
  },
  // French
  fr: {
    compagnyName: "Local 108 Inc.",
    description:
      "Chez Le Local 108, nous faisons plus que du yoga. Nous sommes là pour vous aider à vous sentir bien, à l'intérieur comme à l'extérieur. Nos cours de yoga, nos conseils en nutrition et nos voyages de bien-être sont conçus pour tous ceux qui cherchent à trouver un équilibre entre le corps et l'esprit. Nous sommes convaincus que prendre soin de sa santé est la clé pour vivre une vie heureuse et épanouie.",
    mission:
      "Notre mission est de vous aider à vous sentir bien, à l'intérieur comme à l'extérieur.",

    header: {
      image:
        "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2Ftitle-logo-notext.png?alt=media&token=634f6948-e9d0-48ff-8c22-5fd51a8e9e88",
      scale: 1.5,
    },

    navigation: [
      { title: "À propos", path: "/about" },
      { title: "Services", path: "/services" },
      { title: "Blog", path: "/blog" },
      { title: "Boutique", path: "https://demo.vercel.store/", passHref: true },
    ],
    readMore: "Voir plus",
    services: {
      heading: "Nos Services",
      services: [
        {
          title: "Cours de Yoga",
          description:
            "Nos cours de yoga sont conçus pour vous aider à trouver un équilibre entre le corps et l'esprit.",
          image:
            "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2F240_F_236453770_5YHNr9dPQS6DyIcVqTfKy9sVj3XW70Q2.jpg?alt=media&token=79025603-95a1-4b68-a85f-d5fa9f5ca755",
        },
        {
          title: "Conseils en Nutrition",
          description:
            "Nos conseils en nutrition sont conçus pour vous aider à vous sentir bien, à l'intérieur comme à l'extérieur.",
          image:
            "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2F240_F_764604426_Ao5PkHvrfldsrHcFPBXrRmW6stD0zXNi.jpg?alt=media&token=310af18b-33cc-4ebb-a51e-458bd8b0a351",
        },
        {
          title: "Voyages de Bien-Être",
          description:
            "Nos voyages de bien-être sont conçus pour vous aider à vous détendre et à vous ressourcer.",
          image:
            "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2FScreenshot%202024-05-22%20at%204.39.42%E2%80%AFPM.png?alt=media&token=2650c0bf-7e6a-46d8-ab17-b0f72a36d6c9",
        },
        {
          title: "Boutique",
          description:
            "Notre boutique est conçue pour vous aider à trouver le matériel de yoga et les collations parfaits.",
          image:
            "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2F240_F_593679702_X5zCr4jmAjutz52YsUsyX4eyZwpAHZQc.jpg?alt=media&token=72e29ac6-e037-4b9b-8931-561a8439c708",
        },
      ],
    },
    siteName: "Local 108",
    slogan: "Sentez-vous bien, à l'intérieur",
    slogan2: "comme à l'extérieur",
  },
};
