type FooterFeatures = {
  type: {
    map?: boolean;
    location: string,
    choice: "simple" | "navigational" | "interactive" | "noFooter";
    contactForm?: boolean;
  };
};

type NavbarFeatures = {
  fixed: boolean;
};

export type FeaturesType = {
  banner?: {
    style: "horizontal" | "vertical" | "section";
    size?: "small" | "medium";
  };
  borderMenuNav: boolean;
  footer: FooterFeatures;
  navbar: NavbarFeatures;
};

export const local108Features: FeaturesType = {
  banner: {
    style: "section",
  },
  borderMenuNav: true,
  footer: {
    type: {
      map: true,
      location: "Cafe Du Monde, CA",
      choice: "simple",
    },
  },
  navbar: {
    fixed: false,
  },
};
