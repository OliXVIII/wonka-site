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
  borderMenuNav: boolean;
  footer: FooterFeatures;
  navbar: NavbarFeatures;
};

export const local108Features: FeaturesType = {
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
