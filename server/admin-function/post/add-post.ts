"use server";

import { dbAdmin } from "@/lib/firebase-admin";
import getCurrentDateTime from "@/lib/get-date";
import { Locale } from "@/types/languages";
import Post from "@/types/post";
import { Timestamp } from "firebase-admin/firestore";
type addPostProps = {
  id: string;
  title: string;
  description: string;
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
}: addPostProps): Promise<Post | undefined> => {
  try {
    const createdAt = Timestamp.now().toDate().toString();
    const updatedAt = Timestamp.now().toDate().toString();
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
    await documentRef.set(postData);
    if ((await tableRef.get()).exists) {
      await tableRef.update(tableData);
    } else {
      await tableRef.set(tableData);
    }
    console.log("post created");
    return {
      id,
      title,
      description,
      content,
      imageURL,
      createdAt,
      updatedAt,
      user,
      locale,
    };
  } catch (error) {
    console.error("add-post.ts:", error);
  }
};
