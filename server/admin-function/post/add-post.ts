"use server";

import { dbAdmin } from "@/lib/firebase-admin";
import getCurrentDateTime from "@/lib/get-date";
import { Locale } from "@/types/languages";
import { Timestamp } from "firebase/firestore";
type addPostProps = {
  id?: string;
  title?: string;
  description?: string;
  content?: string;
  domain?: string;
  imageURL?: string;
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
  locale,
}: addPostProps): Promise<void> => {
  try {
    const createdAt = getCurrentDateTime();
    const updatedAt = "";
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
    if (!(await tableRef.get()).exists) {
      await tableRef.set(tableData);
      return;
    }
    await tableRef.update(tableData);
  } catch (error) {
    console.error("add-post.ts:", error);
  }
};
