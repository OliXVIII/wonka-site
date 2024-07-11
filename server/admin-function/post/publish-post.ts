"use server";

import { dbAdmin } from "@/lib/firebase-admin";
import { Locale } from "@/types/languages";
import { Timestamp, doc } from "firebase/firestore";
import { deletePost } from "./delete-post";
type publishPostProps = {
  id: string;
  domain: string;
  locale: Locale;
  user: string;
};

export const publishPost = async ({
  id,
  domain,
  locale,
  user,
}: publishPostProps): Promise<void> => {
  try {
    const documentRef = dbAdmin.doc(
      `domain/${domain}/lang/${locale}/post/${id}`,
    );
    const BlogRef = dbAdmin.doc(`domain/${domain}/lang/${locale}/blog/${id}`);
    const tableRef = dbAdmin.doc(`domain/${domain}/lang/${locale}/post/table`);
    const blogTableRef = dbAdmin.doc(
      `domain/${domain}/lang/${locale}/blog/table`,
    );
    if (!(await documentRef.get()).exists) {
      return;
    }
    const postData = (await documentRef.get()).data() ?? {};
    const tableData = {
      [`${id}`]: {
        title: postData?.title,
        description: postData?.description,
        imageURL: postData?.imageURL,
        user,
      },
    };
    await BlogRef.set(postData);
    if ((await blogTableRef.get()).exists) {
      await blogTableRef.update(tableData);
    } else {
      await blogTableRef.set(tableData);
    }
    deletePost({ id, domain });
  } catch (error) {
    console.error("publish-post.ts:", error);
  }
};
