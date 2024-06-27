import { Language } from "@/types/languages";
import { StaticUiContent } from "@/types/static-ui-content";

export const homePageStaticUiContent: Record<Language, StaticUiContent> = {
  fr: {
    profileMenu: [
      {
        title: "Profil",
        path: "/profile",
      },
      {
        title: "Administration",
        path: "/admin",
      },
      {
        title: "Déconnexion",
        path: "/logout",
      },
    ],
  },
  en: {
    profileMenu: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Admin",
        path: "/admin",
      },
      {
        title: "Sign Out",
        path: "/logout",
      },
    ],
  },
};

export const homePageData: DataType = {
  uiContent: {
    companyName: "Your Company",
    description: "Welcome to our website",
    footer: {
      legal: "",
      notice: "",
      navigation: [],
      design: "",
      crafted: "",
    },
    checkout: "Proceed to checkout",
    navigation: [],
    // Add the other missing properties here
    checkoutAfter: "",
    getStarted: "",
    mission: "",
    readMore: "",
    siteName: "Wonkasite",
    slogan: "Focus on your business, we take care of the rest",
  },
  storage: {
    logo: {
      navbar: {
        src: "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/wonkasite%2Flogo-wonka-nobg.png?alt=media&token=abf6a1fa-95a8-45bf-adaf-e935e9b9b221",
        aspectRatio: 1,
        inceptionLogo: true,
      },
    },
  },
  features: {
    profile: true,
    navbar: {
      fixed: true,
    },
    borderMenuNav: true,
    footer: {
      type: {
        map: false,
        location: "somewhere",
        choice: "simple",
        contactForm: true,
      },
    },
  },
  domain: "",
  upcomingEvents: undefined,
};
