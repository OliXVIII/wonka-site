export type SupportedSocialMedia = "facebook" | "instagram" | "x" | "youtube";

export const socialMediaIcons: Record<
  SupportedSocialMedia,
  { src: string; alt?: string }
> = {
  facebook: {
    alt: "Facebook",
    src: "/facebook.svg",
  },
  instagram: {
    alt: "Instagram",
    src: "/instagram.svg",
  },
  x: {
    alt: "x",
    src: "/x.svg",
  },
  youtube: {
    alt: "Youtube",
    src: "/youtube.svg",
  },
};
