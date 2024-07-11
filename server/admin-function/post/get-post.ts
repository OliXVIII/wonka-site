"use server";

import { dbAdmin } from "@/lib/firebase-admin";
import { Locale } from "@/types/languages";
import Post from "@/types/post";

type getPostProps = {
  domain: string;
  locale: Locale;
  id: string;
};

export const getPost = async ({
  domain,
  locale,
  id,
}: getPostProps): Promise<any | undefined> => {
  try {
    const blogRef = dbAdmin.doc(`domain/${domain}/lang/${locale}/post/${id}`);
    const blog = await blogRef.get();
    return blog.data();
  } catch (error) {
    console.error("get-post.ts:", error);
  }
};
