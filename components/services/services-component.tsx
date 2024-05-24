import { DataType } from "@/server/fetch-data";
import Image from "next/image";

type ServicesComponentProps = {
  data: DataType;
};

export const ServicesComponent = ({ data }: ServicesComponentProps) => {
  const { uiContent } = data;
  const { services } = uiContent;

  if (!services || !services.services.length) {
    return null;
  }

  return (
    <section className="py-20">
      <h2 className="mb-12 text-4xl font-light tracking-[-0.1rem]">
        {services.heading}
        <span className="ml-0.5 align-super text-sm font-bold">
          {services.services.length}
        </span>
      </h2>
      <div className="text-light flex flex-wrap justify-center max-xs:-ml-3 xs:-mx-[1%]">
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
                className="h-full w-full scale-100 object-cover object-center brightness-50 transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
            </div>
            <div className="absolute flex h-full flex-col p-6">
              <button className="border-light w-fit rounded-full border-2 px-4 py-1 font-bold transition-colors">
                Read More
              </button>

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
