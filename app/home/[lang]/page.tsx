import Navbar from "@/components/layout/navbar";
import { DataType } from "@/server/fetch-data";
import { Locale, localesDetails } from "@/types/languages";
import { useSession } from "next-auth/react";
import { Session } from "./session";

type HomePageProps = {
  params: { lang: Locale };
};

const data: DataType = {
  uiContent: {
    companyName: "Your Company",
    description: "Welcome to our website",
    footer: {
      legal: "",
      notice: "",
      navigation: [],
      design: "",
      crafted: "",
    },
    checkout: "Proceed to checkout",
    navigation: [],
    // Add the other missing properties here
    checkoutAfter: "",
    getStarted: "",
    mission: "",
    readMore: "",
    siteName: "Wonkasite",
    slogan: "Focus on your business, we take care of the rest",
    profileMenu: [
      { title: "Profile", path: "/profile" },
      { title: "Settings", path: "/settings" },
      { title: "Sign Out", path: "/sign-out" },
  ],
  },
  storage: {
    logo: {
      navbar: {
        src: "",
        // src: "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/wonkasite%2Flogo-wonka-nobg.png?alt=media&token=abf6a1fa-95a8-45bf-adaf-e935e9b9b221",
        aspectRatio: 1,
        inceptionLogo: true,
      },
    },
  },
  
  features: {
    navbar: {
      fixed: true,
    },
    borderMenuNav: true,
    footer: {
      type: {
        map: false,
        location: "somewhere",
        choice: "simple",
        contactForm: true,
      },
    },
  },
  domain: "",
  upcomingEvents: undefined,
};
const HomePage = ({ params }: HomePageProps) => {
  const locale = localesDetails[params.lang];

  return (
    <div className="flex">
    <div className="flex flex-col">
      <Navbar data={data} locale={locale} admin={true}/>
    </div>
    <div className="flex flex-col justify-center m-auto pt-52">
      <Session />
    </div>
    </div>
    
  );
};

export default HomePage;
