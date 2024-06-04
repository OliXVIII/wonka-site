import { ThemeSelector } from "../theme-selector/theme-selector-server";
import Image from "next/image";

const TopMenu = ({ hide = false }: { hide?: boolean }) => {
  return (
    <div className="supports-backdrop-blur:bg-white/90 fixed top-0 z-40 w-full flex-none border-b border-slate-900/10 bg-white/80 backdrop-blur dark:border-slate-50/[0.15] dark:bg-transparent max-sm:px-1 sm:px-2 lg:z-50">
      <div className="max-w-8xl mx-auto">
        <div className="flex justify-between pb-3 pt-4">
          <div>
            <a
              className="absolute top-0 mx-auto mt-1 h-24 w-24 max-sm:animate-spin-slow max-xs:left-1 max-xs:mt-3 max-xs:h-20 max-xs:w-20 sm:hover:animate-spin-slow"
              href={`/`}
            >
              <Image src="/logo.png" alt="logo" fill className="dark:invert" />
            </a>
          </div>
          <ThemeSelector />
        </div>
      </div>
    </div>
  );
};

export default TopMenu; 
