import Image from "next/image";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

import PostCard from "./post-card";
import { getAllBlog } from "@/server/admin-function/blog/get-all-blog";
import { getAllPost } from "@/server/admin-function/post/get-all-post";
import { Locale } from "@/types/languages";
import BlogCard from "./blog-card";

export default async function Posts({
  domain,
  locale,
}: {
  domain: string;
  locale: Locale;
}) {
  const session = await getSession();
  const admin =
    process.env.NODE_ENV === "development"
      ? true
      : session?.user?.role === "admin";
  // if (!session?.user) {
  //   redirect("/login");
  // }
  // console.log(session);
  const blogs = await getAllBlog({ domain, locale });
  const posts = await getAllPost({ domain, locale });
  console.log("blogs", blogs);
  console.log("posts", posts);

  return blogs.length > 0 ? (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {blogs.map((blog: any) => (
          <BlogCard key={blog.id} data={blog} draft={false} />
        ))}
      </div>
      {posts.length > 0 && admin ? (
        <div className="mt-4 grid grid-cols-1 gap-4 border-t border-dark pt-4 sm:grid-cols-2 xl:grid-cols-4">
          {posts.map((post: any) => (
            <BlogCard key={post.id} data={post} draft={true} />
          ))}
        </div>
      ) : null}
    </>
  ) : (
    <div className="flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl">No Blog Yet</h1>
      <Image
        alt="missing post"
        src="https://illustrations.popsy.co/gray/graphic-design.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        You do not have any posts yet. Create one to get started.
      </p>
    </div>
  );
}
