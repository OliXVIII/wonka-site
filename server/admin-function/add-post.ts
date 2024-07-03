"use server";

import { dbAdmin } from "@/lib/firebase-admin";
import { Locale } from "@/types/languages";
import { Site } from "@prisma/client";
import { c } from "@vercel/blob/dist/put-96a1f07e";

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
  site?: Site;
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
    await documentRef.set(postData);
    await tableRef.update(tableData);
  } catch (error) {
    console.error("add-user.ts Error adding user:", error);
  }
};
