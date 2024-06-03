import { DataType } from "@/server/fetch-data";
import FooterSimple from "./footer-simple";
import { SocialMediaComponent } from "./social-media";
import FooterBottom from "./footer-bottom";
import StaticGoogleMap from "./static-google-map";
import { LocaleDetails } from "@/types/languages";

type FooterProps = {
  data: DataType;
  locale: LocaleDetails;
};

export default async function Footer({ data, locale }: Readonly<FooterProps>) {
  const { uiContent, storage, features } = data;

  return (
    <footer className="relative mx-auto text-sm max-md:border-t">
      <FooterSimple locale={locale} data={data} />
      {features.footer.type.map && <StaticGoogleMap storage={storage} />}
      {storage.socialMedia && (
        <SocialMediaComponent socialMedia={storage.socialMedia} />
      )}
      <FooterBottom
        uiContent={uiContent}
        horizontalBanner={features.eventStyle}
        dimensions={data.features.bannerSize}
      />
    </footer>
  );
}
