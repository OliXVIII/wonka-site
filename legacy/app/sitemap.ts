import { headers } from "next/headers";

import { getPostsForSite } from "@/lib/fetchers";
import { getCollections, getPages, getProducts } from "@/lib/shopify";

type Route = {
  url: string;
  lastModified: string;
};

export default async function Sitemap() {
  const headersList = headers();
  const domain =
    headersList
      .get("host")
      ?.replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) ??
    "vercel.pub";

  const posts = await getPostsForSite(domain);

  let fetchedRoutes: Route[] = [];

  //How could I verify that a domain contains products to process to the next step?

  const collectionsPromise = getCollections().then((collections) =>
    collections.map((collection) => ({
      url: `${domain}/store/${collection.path}`,
      lastModified: collection.updatedAt,
    })),
  );

  const productsPromise = getProducts({}).then((products) =>
    products.map((product) => ({
      url: `${domain}/store/product/${product.handle}`,
      lastModified: product.updatedAt,
    })),
  );

  const pagesPromise = getPages().then((pages) =>
    pages.map((page) => ({
      url: `${domain}/store/${page.handle}`,
      lastModified: page.updatedAt,
    })),
  );

  try {
    fetchedRoutes = (
      await Promise.all([collectionsPromise, productsPromise, pagesPromise])
    ).flat();
  } catch (error) {
    throw JSON.stringify(error, null, 2);
  }

  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
    },
    ...posts.map(({ slug }: { slug: string }) => ({
      url: `https://${domain}/${slug}`,
      lastModified: new Date(),
    })),
    ...fetchedRoutes,
  ];
}
