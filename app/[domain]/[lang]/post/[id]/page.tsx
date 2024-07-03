import { useEffect, useState } from "react";
import { RedirectType, redirect, useRouter } from "next/navigation";
import Editor from "@/components/post/editor";
import prisma from "@/lib/prisma"; // Ensure you have prisma setup correctly
import { Locale } from "@/types/languages";
import { verifyUserAdmin } from "@/server/admin-function/verify-user-admin";
import { getSession } from "next-auth/react";
import Post from "@/types/post";

export default async function EditPost({
  params,
}: {
  params: { domain: string; lang: Locale; id: string };
}) {
  //   const router = useRouter();
  //   const [post, setPost] = useState<PostWithSite | null>(null);
  //   const [loading, setLoading] = useState(true);
  const session = await getSession();
  const admin =
    process.env.NODE_ENV === "development"
      ? true
      : await verifyUserAdmin(params.domain, session?.user?.id!);

  if (!admin) {
    redirect(`/${params.lang}/blog/${params.id}`, RedirectType.replace);
  }
  // const post = await prisma.post.findUnique({
  //   where: { id: params.id },
  //   include: {
  //     site: {
  //       select: {
  //         subdomain: true,
  //       },
  //     },
  //   },
  // });
  const post: Post = {
    id: params.id,
    title: "",
    description: "",
    content: "",
    imageURL: "imageURL",
    createdAt: "",
    updatedAt: "",
    // published: true,
    // siteId: "siteId",
    locale: params.lang,
  };
  //   useEffect(() => {
  //     if (id) {
  //       // Function to fetch post data by id
  //       const fetchPost = async (postId: string) => {
  //         const response = await fetch(`/api/posts/${postId}`);
  // const postData = await response.json();
  // setPost(postData);
  //         // setLoading(false);
  //       };

  //       fetchPost(id as string);
  //     }
  //   }, [id]);

  return (
    <div className="container mx-auto p-4">
      <Editor post={post} locale={params.lang} id={params.id} />
    </div>
  );
}
