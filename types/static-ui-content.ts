import { Language } from "./languages";
import { MenuContent } from "./ui-content";

export type StaticUiContent = {
    profileMenu: MenuContent[];
}

export const staticUiContent: Record<Language, StaticUiContent> = {
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
    }
}