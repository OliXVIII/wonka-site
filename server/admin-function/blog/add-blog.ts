"use server";

import { dbAdmin } from "@/lib/firebase-admin";
import getCurrentDateTime from "@/lib/get-date";
import { Locale } from "@/types/languages";
import { get } from "http";
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

export const addBlog = async ({
  id,
  title,
  description,
  content,
  domain,
  imageURL,
  locale,
}: addPostProps): Promise<void> => {
  try {
    const documentRef = dbAdmin.doc(
      `domain/${domain}/lang/${locale}/blog/${id}`,
    );
    const tableRef = dbAdmin.doc(`domain/${domain}/lang/${locale}/blog/table`);
    const createdAt = getCurrentDateTime();
    const updatedAt = "";
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
    console.error("add-blog.ts:", error);
  }
};
