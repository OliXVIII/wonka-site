import { useEffect, useState } from "react";
import { RedirectType, redirect, useRouter } from "next/navigation";
import Editor from "@/components/post/editor";
import prisma from "@/lib/prisma"; // Ensure you have prisma setup correctly
import { Locale } from "@/types/languages";
import { verifyUserAdmin } from "@/server/admin-function/verify-user-admin";
import { getSession } from "next-auth/react";
import Post from "@/types/post";
import { get } from "http";
import { getPost } from "@/server/admin-function/post/get-post";

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
  const domain = params.domain.replace(".wonkasite", "");
  console.log(params);
  const post = await getPost({
    domain: domain,
    locale: params.lang,
    id: params.id,
  });
  console.log(post);
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
  console.log(post);
  return (
    <div className="container mx-auto p-4">
      <Editor post={post} locale={params.lang} id={params.id} />
    </div>
  );
}
