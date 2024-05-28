import { UiContent } from "@/types/ui-content";

export default function FooterBottom(uiContent: UiContent) {
  const currentYear = new Date().getFullYear();
  const copyrightName =
    "@ " +
    currentYear.toString() +
    " " +
    uiContent.compagnyName +
    " - " +
    uiContent.footer.legal;
  return (
    <div className="mt-5 border-t border-neutral-200 py-10 text-sm dark:border-neutral-700">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
        <p>{copyrightName}</p>
        <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
        <p>{uiContent.footer.design}</p>
        <p className="md:ml-auto">
          {uiContent.footer.crafted}{" "}
          <a
            // href="https://wonkasite.com"
            className="relative text-black dark:text-white"
          >
            Wonkasite
            <span className="absolute right-[60px] top-1/2 -translate-y-1/2 transform"></span>
          </a>
        </p>
      </div>
    </div>
  );
}
