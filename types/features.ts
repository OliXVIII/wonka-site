type FooterFeatures = {
  type: {
    map?: boolean;
    choice: "simple" | "navigational" | "interactive" | "noFooter";
    contactForm?: boolean;
  };
};

type NavbarFeatures = {
  fixed: boolean;
};

export type FeaturesType = {
  eventStyle?: "pageComp" | "horizontal" | "vertical";
  eventDimensions?: {
    dimensions: "small" | "medium";
    small: string;
    medium: string;
  };
  borderMenuNav: boolean;
  footer: FooterFeatures;
  navbar: NavbarFeatures;
};

export const local108Features: FeaturesType = {
  eventStyle: "horizontal",
  eventDimensions: {
    dimensions: "small",
    small: "36",
    medium: "44",
  },
  borderMenuNav: true,
  footer: {
    type: {
      map: true,
      choice: "simple",
    },
  },
  navbar: {
    fixed: false,
  },
};
