import { Carousel } from "@/components/store/carousel";
import { ThreeItemGrid } from "@/components/grid/three-items";
import { Suspense } from "react";

type Params = {
  params: { domain: string };
};

export async function generateMetadata({ params }: Params) {
  return {
    title: "Title",
    description: "Description",
    openGraph: {
      title: "Title",
      description: "Description",
    },
  };
}

export default async function HomePage({ params }: Params) {
  console.log("Store for domain:", params.domain);

  return (
    <>
      <ThreeItemGrid />
      <Suspense>
        <Carousel />
      </Suspense>
    </>
  );
}
