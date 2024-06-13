"use server";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { MenuContent, UiContent, local108UIContent } from "@/types/ui-content";
import { LocaleDetails } from "@/types/languages";
import { StorageType, storageLocal108 } from "@/types/storage";
import { FeaturesType, local108Features } from "@/types/features";
import {
  LocaleUpcomingEvent,
  upcomingEventsLocal108,
} from "@/types/upcoming-event";

export type DataType = {
  uiContent: UiContent;
  storage: StorageType;
  features: FeaturesType;
  domain: string;
  upcomingEvents?: LocaleUpcomingEvent;
  customDomain?: string;
  profileMenu?: MenuContent[];
}

export async function fetchData(
  domain: string,
  lang: LocaleDetails,
): Promise<DataType | null> {
  // const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
  //   ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
  // : null;
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
      customDomain: "local-108.com",
    };
  }
  const docRef = doc(db, `domain/${domain}/lang/${lang.path}`);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    console.log("No such document!");
    return null;
  }

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
  } else {
    console.log("No such document!");
    return null;
  }
}
