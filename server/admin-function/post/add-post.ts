"use server";

import { dbAdmin } from "@/lib/firebase-admin";
import { Locale } from "@/types/languages";
type addPostProps = {
  id?: string;
  title?: string;
  description?: string;
  content?: string;
  domain?: string;
  imageURL?: string;
  createdAt?: string;
  updatedAt?: string;
  published?: boolean;
  siteId?: string;
  locale?: Locale;
};

export const addPost = async ({
  id,
  title,
  description,
  content,
  domain,
  imageURL,
  createdAt,
  updatedAt,
  published,
  siteId,
  locale,
}: addPostProps): Promise<void> => {
  try {
    const documentRef = dbAdmin.doc(
      `domain/${domain}/lang/${locale}/post/${id}`,
    );
    const tableRef = dbAdmin.doc(`domain/${domain}/lang/${locale}/post/table`);

    const postData = {
      title,
      description,
      content,
      imageURL,
      createdAt,
      updatedAt,
    };

    const tableData = {
      [`${id}`]: {
        title,
        description,
        imageURL,
      },
    };
    console.log(postData, tableData);
    await documentRef.set(postData);
    if (!tableRef.exists) {
      await tableRef.set(tableData);
      return;
    }
    await tableRef.update(tableData);
  } catch (error) {
    console.error("add-user.ts Error adding user:", error);
  }
};
