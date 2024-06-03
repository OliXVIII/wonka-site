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
  bannerSize?: "small" | "medium";
  borderMenuNav: boolean;
  footer: FooterFeatures;
  navbar: NavbarFeatures;
};

export const local108Features: FeaturesType = {
  eventStyle: "horizontal",
  bannerSize: "small",
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
