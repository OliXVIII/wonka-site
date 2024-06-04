import { StorageType } from "@/types/storage";
import { UiContent } from "@/types/ui-content";
import Image from "next/image";

type ServicesPageProps = {
  uiContent: UiContent;
  storage: StorageType;
};

export const ServicesPage = ({ uiContent, storage }: ServicesPageProps) => {
  return (
    <div className="my-8 flex flex-col items-center justify-center space-y-8">
      {uiContent.services?.services?.map((service, index) => (
        <div
          key={service.title}
          className={`flex w-full p-5 ${
            index % 2 === 0 ? "flex-row" : "flex-row-reverse"
          } space-x-5`}
        >
          <div className="relative aspect-video min-w-[50%]">
            <Image
              src={service.image}
              alt={service.title}
              layout="fill"
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center p-5 space-y-4">
            <h3 className="text-center text-2xl font-semibold">{service.title}</h3>
            <p className="text-gray-300">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
