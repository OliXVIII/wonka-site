import { LocaleDetails } from "@/types/languages";
import { MenuContent } from "@/types/ui-content";

export const createLink = (item: MenuContent, locale: LocaleDetails) => {
  return !item.externalLink ? `/${locale.path + item.path}` : item.path;
};
