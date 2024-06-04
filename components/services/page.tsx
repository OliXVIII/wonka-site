import { StorageType } from "@/types/storage";
import { UiContent } from "@/types/ui-content";
import Image from "next/image";

type ServicesPageProps = {
  uiContent: UiContent;
  storage: StorageType;
};

export const ServicesPage = ({ uiContent, storage }: ServicesPageProps) => {
  return (
    <div className="my-8 flex flex-col items-center justify-center">
      {uiContent.services?.services?.map((service, index) => {
        return (
          <div
            key={service.title}
            className={`flex w-full ${index % 2 === 0 ? "" : "flex-row-reverse"}`}
          >
            <div className="relative aspect-video min-w-[50%]">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="text-center text-2xl">{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
