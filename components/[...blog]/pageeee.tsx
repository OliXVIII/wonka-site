// export async function generateStaticParams() {
//     const allPosts = await prisma.post.findMany({
//       select: {
//         slug: true,
//         site: {
//           select: {
//             subdomain: true,
//             customDomain: true,
//           },
//         },
//       },
//       // feel free to remove this filter if you want to generate paths for all posts
//       where: {
//         site: {
//           subdomain: "demo",
//         },
//       },
//     });

//     const allPaths = allPosts
//       .flatMap(({ site, slug }) => [
//         site?.subdomain && {
//           domain: `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
//           slug,
//         },
//         site?.customDomain && {
//           domain: site.customDomain,
//           slug,
//         },
//       ])
//       .filter(Boolean);

//     return allPaths;
//   }
