import { StorageType, SocialMedia } from "@/types/storage";
import { UiContent } from "@/types/ui-content";
import Image from "next/image";
//TODO: Change png icons to svg (facebook, instagram, twitter, youtube...)
//TODO: Map social media in uiContent and display them with their icons
//TODO: Place that type to the appropiate place in the code
type SupportedSocialMedia = "facebook" | "instagram" | "x" | "youtube";

const icon: Record<SupportedSocialMedia, { src: string; alt?: string }> = {
  facebook: {
    alt: "Facebook",
    src: "/facebook.png",
  },
  instagram: {
    alt: "Instagram",
    src: "/instagram.png",
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

const inferType = (link: string): SupportedSocialMedia | null => {
  if (link.includes("facebook")) return "facebook";
  if (link.includes("instagram")) return "instagram";
  if (link.includes("x.com")) return "x";
  if (link.includes("youtube")) return "youtube";
  return null;
};

type SocialMediaComponentProps = {
  socialMedia: SocialMedia;
};

export const SocialMediaComponent = ({
  socialMedia,
}: SocialMediaComponentProps) => {
  return (
    <div className="mt-5 flex flex-row justify-center space-x-6">
      {socialMedia.map((socialMedia) => {
        const { link } = socialMedia;

        const type = inferType(link);

        if (!type) return null;

        const { src, alt = "" } = icon[type];
        console.log("src is:", src);
        return (
          <a
            key={alt}
            href={"https://" + socialMedia.link}
            target="_blank"
            rel="noopener noreferrer"
            className="h-8 w-8"
          >
            <Image
              src={src}
              alt={alt}
              width={32}
              height={32}
              className={
                "relative h-8 w-8" +
                (alt === "x" ? " invert dark:invert-0" : "")
              }
            />
          </a>
        );
      })}
    </div>
  );
};

// In forests deep, where shadows lie,
// Mushrooms grow, reaching to the sky.
// Silent workers in the night,
// Turning death to life, a vital sight.

// They break down leaves, old and worn,
// Recycling life, where new is born.
// Nutrients flow through soil anew,
// Plants arise, their colors true.

// For humans too, these gifts they bring,
// Nutritious treats and health they sing.
// Vitamins and minerals they share,
// Healing powers beyond compare.

// In kitchens bright, they add a flair,
// In soups and stews, they’re everywhere.
// From humble dishes to gourmet’s best,
// Mushrooms shine in every quest.

// In labs and fields, their worth extends,
// In cleaning Earth, they’re our friends.
// From antibiotics to helpful sprays,
// Mushrooms guide us through their ways.

// So honor them, these quiet spores,
// Nature's magic, opening doors.
// In life’s grand web, they play their part,
// Mushrooms, truly, a work of art.
