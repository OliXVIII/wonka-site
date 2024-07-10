"use server";

import { dbAdmin } from "@/lib/firebase-admin";
import getCurrentDateTime from "@/lib/get-date";
import { Locale } from "@/types/languages";
import { Timestamp } from "firebase-admin/firestore";
type addPostProps = {
  id: string;
  title: string;
  description?: string;
  content: string;
  domain: string;
  imageURL: string;
  locale: Locale;
  user: string;
};

export const addPost = async ({
  id,
  title,
  description,
  content,
  domain,
  imageURL,
  locale,
  user,
}: addPostProps): Promise<void> => {
  try {
    const createdAt = Timestamp.now();
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
      user,
    };

    const tableData = {
      [`${id}`]: {
        title,
        description,
        imageURL,
        user,
      },
    };
    console.log(postData, tableData);
    await documentRef.set(postData);
    if (!(await tableRef.get()).exists) {
      await tableRef.set(tableData);
      return;
    }
    await tableRef.update(tableData);
    console.log("post created");
  } catch (error) {
    console.error("add-post.ts:", error);
  }
};
