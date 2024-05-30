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
    height: number;
    width: any;
  }
  borderMenuNav: boolean;
  footer: FooterFeatures;
  navbar: NavbarFeatures;
};

export const local108Features: FeaturesType = {
  eventStyle: "horizontal",
  eventDimensions: {
    height: 48, //44 by default
    width: "screen", //screen by default for horizontal and full for PageComp
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
