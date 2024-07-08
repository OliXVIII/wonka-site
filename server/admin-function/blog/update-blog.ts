"use server";

import { dbAdmin } from "@/lib/firebase-admin";
import getCurrentDateTime from "@/lib/get-date";
import { Locale } from "@/types/languages";

type updatePostProps = {
  id: string;
  title?: string;
  description?: string;
  content?: string;
  domain: string;
  imageURL?: string;
  updatedAt: string;
  locale: Locale;
};

export const updateBlog = async ({
  id,
  title,
  description,
  content,
  domain,
  imageURL,
  locale,
}: updatePostProps): Promise<void> => {
  try {
    const documentRef = dbAdmin.doc(
      `domain/${domain}/lang/${locale}/blog/${id}`,
    );
    const tableRef = dbAdmin.doc(`domain/${domain}/lang/${locale}/blog/table`);
    const updatedAt = getCurrentDateTime();
    const postData = {
      title,
      description,
      content,
      imageURL,
      updatedAt,
    };

    const tableData = {
      [`${id}`]: {
        title,
        description,
        imageURL,
      },
    };

    console.log("Updating post:", postData, "Updating table:", tableData);

    await documentRef.update(postData);

    const tableSnapshot = await tableRef.get();
    if (tableSnapshot.exists) {
      await tableRef.update(tableData);
    } else {
      console.warn("Table does not exist, creating a new one.");
      await tableRef.set(tableData);
    }
  } catch (error) {
    console.error("update-blog.ts:", error);
  }
};
