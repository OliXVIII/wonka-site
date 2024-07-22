import Image from "next/image";

import { DataType } from "@/server/fetch-data";

import { ReadMoreButton } from "../read-more-button";

type ServicesSectionProps = {
  data: DataType;
};

export const ServicesSection = ({ data }: ServicesSectionProps) => {
  const { uiContent } = data;
  const { services } = uiContent;

  if (!services?.services.length) {
    return null;
  }

  return (
    <section className="py-10 sm:pt-28">
      <h2 className="mb-12 text-4xl font-light tracking-[-0.1rem]">
        {services.heading}
        <span className="ml-0.5 align-super text-sm font-bold">
          {services.services.length}
        </span>
      </h2>
      <div className="flex flex-wrap justify-center text-light max-xs:-ml-3 xs:-mx-[1%]">
        {services.services.map((service) => (
          <div
            key={service.title}
            className="relative h-72 w-[48%] overflow-hidden max-md:mb-4 max-md:w-[94%] max-xs:h-60 sm:m-[1%] lg:h-72"
          >
            <div className="absolute inset-0 w-full">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="h-full w-full scale-100 rounded-box object-cover object-center brightness-90 transition-transform duration-500 ease-in-out group-hover:scale-110 dark:brightness-[0.85]"
              />
            </div>
            <div className="absolute inset-0 flex h-full flex-col rounded-b-lg bg-gradient-to-t from-[#000000] to-transparent p-5">
              {/* <ReadMoreButton readMore={uiContent.readMore} /> */}

              <div className="flex-grow">
                {/* This div will take up all available space between the button and the content below */}
              </div>
              <h3 className="mb-3 text-2xl font-semibold">{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
