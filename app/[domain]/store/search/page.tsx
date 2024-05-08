import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { orama, parseSorting } from "@/lib/orama";
import { Product } from "@/lib/shopify/types";
import { headers } from "next/headers";
import { useSearchParams } from "next/navigation";

type SearchParams = {
  params: {
    domain: string;
  };
};

export async function generateMetadata({ params }: SearchParams) {
  return {
    title: "Title",
    description: "Description",
    openGraph: {
      title: "Title",
      description: "Description",
    },
    twitter: {
      card: "summary_large_image",
      title: "Title",
      description: "Description",
      creator: "@vercel",
    },
  };
}

export default async function SearchPage({ params }: SearchParams) {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "relevance";
  const searchValue = searchParams.get("q") || "";

  const products = await orama.search({
    term: searchValue,
    boost: {
      title: 2,
    },
    sortBy: parseSorting(sort),
    limit: 50,
  });
  if (!products) return null;

  const resultsText = products.count > 1 ? "results" : "result";
  const docs = products.hits.map((hit: any) => hit.document) as Product[];

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {products.count === 0
            ? "There are no products that match "
            : `Showing ${products.count} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.count > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={docs} />
        </Grid>
      ) : null}
    </>
  );
}
