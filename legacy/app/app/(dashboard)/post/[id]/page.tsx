import { notFound, redirect } from "next/navigation";

import Editor from "@/components/post/editor";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function PostPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.post.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      site: {
        select: {
          subdomain: true,
        },
      },
    },
  });
  if (!data) {
    notFound();
  }

  return <Editor post={data} />;
}
