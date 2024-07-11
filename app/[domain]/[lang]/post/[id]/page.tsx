"use server";

import { RedirectType, redirect } from "next/navigation";
import Editor from "@/components/post/editor";
import { Locale } from "@/types/languages";
import { verifyUserAdmin } from "@/server/admin-function/verify-user-admin";
import { getSession } from "next-auth/react";
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
  const post = await getPost({
    domain: domain,
    locale: params.lang,
    id: params.id,
  });

  console.log("post", post);
  return (
    <div className="container mx-auto p-4">
      {post ? <Editor post={post} locale={params.lang} id={params.id} /> : null}
    </div>
  );
}
