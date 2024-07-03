import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Editor from "@/components/post/editor";
import prisma from "@/lib/prisma"; // Ensure you have prisma setup correctly

export default async function EditPost({ params }: { params: { id: string } }) {
  //   const router = useRouter();
  //   const [post, setPost] = useState<PostWithSite | null>(null);
  //   const [loading, setLoading] = useState(true);

  const post = await prisma.post.findUnique({
    where: { id: decodeURIComponent(params.id) },
    include: {
      site: {
        select: {
          subdomain: true,
        },
      },
    },
  });
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
      <Editor post={post} />
    </div>
  );
}
