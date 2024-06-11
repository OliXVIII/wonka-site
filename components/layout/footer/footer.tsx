import { DataType } from "@/server/fetch-data";
import FooterSimple from "./footer-simple";
import { SocialMediaComponent } from "./social-media";
import FooterBottom from "./footer-bottom";
import StaticGoogleMap from "./static-google-map";
import { LocaleDetails } from "@/types/languages";

type FooterProps = {
  data: DataType;
  locale: LocaleDetails;
  upcoming?: boolean;
};

export default async function Footer({
  data,
  locale,
  upcoming,
}: Readonly<FooterProps>) {
  const { uiContent, storage, features, upcomingEvents } = data;

  return (
    <footer className="relative mx-auto mt-16 max-w-full text-sm max-md:border-t xl:!max-w-screen-2xl">
      <FooterSimple locale={locale} data={data} />
      {features.footer.type.map && data.features.footer.type.location && (
        <StaticGoogleMap
          location={
            upcoming && upcomingEvents
              ? upcomingEvents[locale.languageCode].location
              : data.features.footer.type.location
          }
        />
      )}
      {storage.socialMedia && (
        <SocialMediaComponent socialMedia={storage.socialMedia} />
      )}
      <FooterBottom uiContent={uiContent} banner={data.features.banner} upcoming={upcoming} />
    </footer>
  );
}
