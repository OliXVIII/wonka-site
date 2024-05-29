type FooterFeatures = {
  type: {
    map?: boolean;
    choice: "simple" | "navigational" | "interactive" | "noFooter";
    contactForm?: boolean;
  };
};

export type FeaturesType = {
  borderMenuNav: boolean;
  footer: FooterFeatures;
};

export const local108Features: FeaturesType = {
  borderMenuNav: true,
  footer: {
    type: {
      map: true,
      choice: "simple",
    },
  },
};
