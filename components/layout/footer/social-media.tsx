import { storageLocal108 } from "@/types/storage";
import { socialMediaLinks } from "@/types/social-media-link";

const icon = storageLocal108.icon;

export default function SocialMedia() {
    const icon = storageLocal108.icon;

    return (
    <div className="flex flex-row justify-center space-x-6 mt-5">
        <a href={socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer">
            <img src={icon?.facebook?.src} alt="Facebook" className="w-8 h-8" />
        </a>
        <a href={socialMediaLinks.X} target="_blank" rel="noopener noreferrer">
            <img src={icon?.X?.src} alt="X" className="w-8 h-8"/>
        </a>
        <a href={socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer">
            <img src={icon?.instagram?.src} alt="Instagram" className="w-8 h-8"/>
        </a>
    </div>
    );
}