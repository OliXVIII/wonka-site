
'use client';
import { getCollection, getCollectionProducts } from "@/lib/shopify";
import { Metadata } from "next";
import { notFound, useSearchParams } from "next/navigation";

import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { defaultSort, sorting } from "@/lib/shopify/constants";
import { Product } from "@/lib/shopify/types";
import { use, useEffect } from "react";

type SearchCollectionParams = {
  params: {
    domain: string;
    collection: string;
  };
};

// export async function generateMetadata({
//   params,
// }: {
//   params: { collection: string };
// }): Promise<Metadata> {
//   const collection = await getCollection(params.collection);

//   if (!collection) return notFound();

//   return {
//     title: collection.seo?.title || collection.title,
//     description:
//       collection.seo?.description ||
//       collection.description ||
//       `${collection.title} products`,
//   };
// }

const CategoryPage = ({ params }: SearchCollectionParams) => {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "relevance";
  const searchValue = searchParams.get("q") || "";
  let products: Product[] = [];

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;


  const fetchProducts = async () => {
    products = await getCollectionProducts({
      collection: params.collection,
      sortKey,
      reverse,
    });
  }

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}

export default CategoryPage;