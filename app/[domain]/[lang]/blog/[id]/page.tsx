"use server";

import { getBlog } from "@/server/admin-function/blog/get-blog";
import { Locale } from "@/types/languages";
import { Link } from "lucide-react";

export default async function Blog({
  params,
}: {
  params: { domain: string; lang: Locale; id: string };
}) {
  const domain = params.domain.replace(".wonkasite", "");
  const blog = await getBlog({
    domain: domain,
    locale: params.lang,
    id: params.id,
  });
  if (!blog) {
    return;
  }

  return (
    <div className="min-h-screen text-dark">
      <h1>
        <title>
          {blog.title} - By {blog.user}
        </title>
        <meta name="description" content={blog.description} />
      </h1>
      <h2 className="container mx-auto px-4 py-8">
        <article className="dark:prose-dark prose mx-auto justify-center lg:prose-xl">
          <h1 className="mb-4 text-center text-4xl font-bold text-dark">
            {blog.title}
          </h1>
          <p className="mb-6 text-xl text-dark">{blog.description}</p>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>
      </h2>
    </div>
  );
}
