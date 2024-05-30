"use server";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { UiContent, local108UIContent } from "@/types/ui-content";
import { LocaleDetails } from "@/types/languages";
import { StorageType, storageLocal108 } from "@/types/storage";
import { demoUIContent, storageDemo } from "@/lib/demo";
import { FeaturesType, local108Features } from "@/types/features";
import {
  LocaleUpcomingEvent,
  UpcomingEvent,
  upcomingEventsLocal108,
} from "@/types/upcoming-event";

export type DataType = {
  uiContent: UiContent;
  storage: StorageType;
  features: FeaturesType;
  domain: string;
  upcomingEvents: LocaleUpcomingEvent;
};

export async function fetchData(
  domain: string,
  lang: LocaleDetails,
): Promise<DataType | null> {
  console.log("fetchData", domain, lang);
  // const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
  //   ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
  // : null;
  if (domain !== "demo.wonkasite.com" && domain !== "demo.localhost:3000") {
    if (
      domain === "local-108.com" ||
      domain === "local-108.wonkasite.com" ||
      domain === "local-108.localhost:3000"
    ) {
      return {
        uiContent: local108UIContent[lang.languageCode],
        storage: storageLocal108,
        features: local108Features,
        upcomingEvents: upcomingEventsLocal108,
        domain: domain,
      };
    }
    const docRef = doc(db, `domain/${domain}/lang/${lang.path}`);
    const docSnap = await getDoc(docRef);

    const data = docSnap.data();

    if (data?.uiContent) {
      console.log("Document data:", docSnap.data());
      return {
        uiContent: data.uiContent as UiContent,
        storage: data.storage,
        features: data.features,
        upcomingEvents: data.upcomingEvents,
        domain: domain,
      };
    }
  }
  return null;
}
