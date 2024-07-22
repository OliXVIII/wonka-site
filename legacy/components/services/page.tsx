import Image from "next/image";

import { StorageType } from "@/types/storage";
import { UiContent } from "@/types/ui-content";

type ServicesPageProps = {
  uiContent: UiContent;
  storage: StorageType;
};

export const ServicesPage = ({ uiContent, storage }: ServicesPageProps) => {
  return (
    <div className="container mx-auto my-8 px-4">
      <div className="grid gap-8">
        {uiContent.services?.services?.map((service, index) => (
          <div
            key={service.title}
            className={`flex flex-col md:flex-row ${index % 2 !== 0 && "md:flex-row-reverse"} overflow-hidden rounded-lg shadow-lg dark:shadow-sm dark:shadow-light`}
          >
            <div className="relative aspect-video w-full md:w-1/2">
              <Image
                src={service.image}
                alt={service.title}
                layout="fill"
                className="object-cover"
              />
            </div>
            <div className="flex w-full flex-col justify-center p-8 md:w-1/2 ">
              <h3 className="mb-4 text-center text-3xl font-semibold text-gray-800 dark:text-gray-200">
                {service.title}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
