import { StorageType } from "@/types/storage";
import { UiContent } from "@/types/ui-content";
import Image from "next/image";

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
            className={`flex flex-col md:flex-row ${index % 2 !== 0 && "md:flex-row-reverse"} shadow-lg rounded-lg overflow-hidden dark:shadow-sm dark:shadow-white`}
          >
            <div className="relative md:w-1/2 w-full aspect-video">
              <Image
                src={service.image}
                alt={service.title}
                layout="fill"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:w-1/2 w-full ">
              <h3 className="text-center text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};