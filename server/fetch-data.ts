"use server";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import {
  UiContent,
  demoUIContent,
  local108UIContent,
} from "@/types/ui-content";
import { LocaleDetails } from "@/types/languages";
import { StorageType } from "@/types/storage";

export type DataType = {
  uiContent: UiContent;
  storage: StorageType;
  features: any;
  domain: string;
};

export async function fetchData(
  domain: string,
  lang: LocaleDetails,
): Promise<DataType> {
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
        storage: {
          logo: {
            navbar: {
              link: "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/logo-navbar.png?alt=media&token=bb7efcc6-7118-4275-a38e-85a7e9f41172",
              aspectRatio: 1.5,
            },
          },
        },
        features: {},
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
        domain: domain,
      };
    }
  }
  return {
    uiContent: demoUIContent[lang.languageCode],
    storage: {
      logo: {
        navbar: {
          link: "https://firebasestorage.googleapis.com/v0/b/wonkasite.appspot.com/o/local-108%2Flogo%2Flocal-108-logo.png?alt=media&token=3b3b3b3b-3b3b-3b3b-3b3b-3b3b3b3b3b3b",
        },
      },
    },
    features: {},
    domain: domain,
  };
}
