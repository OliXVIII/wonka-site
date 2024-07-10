"use server";

import { dbAdmin } from "@/lib/firebase-admin";
import { Locale } from "@/types/languages";
import Post from "@/types/post";

type getBlogProps = {
  domain: string;
  locale: Locale;
  id: string;
};

export const getBlog = async ({
  domain,
  locale,
  id,
}: getBlogProps): Promise<Post | undefined> => {
  try {
    const blogRef = dbAdmin.doc(`domain/${domain}/lang/${locale}/blog/${id}`);
    const blog = await blogRef.get();
    return blog.data();
  } catch (error) {
    console.error("get-blog.ts:", error);
  }
};
