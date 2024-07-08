"use server";

import { dbAdmin } from "@/lib/firebase-admin";
import { Locale } from "@/types/languages";

type PostSummary = {
  id: string;
  title: string;
  description: string;
  imageURL: string;
};

type getAllPostsProps = {
  domain: string;
  locale: Locale;
};

export const getAllPost = async ({
  domain,
  locale,
}: getAllPostsProps): Promise<PostSummary[]> => {
  const allPosts: PostSummary[] = [];
  try {
    const tableRef = dbAdmin.doc(`domain/${domain}/lang/${locale}/post/table`);
    const tableSnapshot = await tableRef.get();

    if (tableSnapshot.exists) {
      const tableData = tableSnapshot.data() || {};

      for (const [id, post] of Object.entries(tableData)) {
        allPosts.push({
          id,
          title: post.title,
          description: post.description,
          imageURL: post.imageURL,
        });
      }
    }
  } catch (error) {
    console.error("get-all-posts.ts:", error);
  }
  return allPosts;
};
