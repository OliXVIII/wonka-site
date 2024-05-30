import { FeaturesType } from "@/types/features";
import { UiContent } from "@/types/ui-content";

type FooterBottomProps = {
  uiContent: UiContent;
  horizontalBanner: FeaturesType["eventStyle"];
  height: number | undefined;
};

export default function FooterBottom({
  uiContent,
  horizontalBanner,
  height,
}: Readonly<FooterBottomProps>) {
  const currentYear = new Date().getFullYear();
  const copyrightName =
    "@ " +
    currentYear.toString() +
    " " +
    uiContent.companyName +
    " " +
    uiContent.footer.legal;
  return (
    <div className={`1mt-5 border-t py-10 text-sm ${horizontalBanner == "horizontal" ? `mb-${height ?? 44} w-screen` : ""}`}>
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
        <p>{copyrightName}</p>
        <hr className="mx-4 hidden h-4 w-[1px] border-l md:inline-block" />
        <p>{uiContent.footer.design}</p>
        <p className="md:ml-auto">
          {uiContent.footer.crafted}{" "}
          <a
            //href="https://wonkasite.com"
            className="relative font-[cursive] font-bold text-emerald-700 dark:text-amber-100"
          >
            Wonkasite
            <span className="absolute right-[60px] top-1/2 -translate-y-1/2 transform"></span>
          </a>
        </p>
      </div>
    </div>
    
  );
  
}
