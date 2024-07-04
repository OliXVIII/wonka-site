"use server";

import { dbAdmin } from "@/lib/firebase-admin";
import { locales } from "@/types/languages";

type deletePostProps = {
  id: string;
  domain: string;
};

export const deleteBlog = async ({
  id,
  domain,
}: deletePostProps): Promise<void> => {
  try {
    for (const locale of locales) {
      const documentRef = dbAdmin.doc(
        `domain/${domain}/lang/${locale}/blog/${id}`,
      );
      const tableRef = dbAdmin.doc(
        `domain/${domain}/lang/${locale}/blog/table`,
      );

      await documentRef.delete();
      const tableSnapshot = await tableRef.get();
      if (tableSnapshot.exists) {
        const tableData = tableSnapshot.data() || {};
        delete tableData[id];
        await tableRef.set(tableData);
      }
    }
  } catch (error) {
    console.error("delete-post.ts Error deleting post:", error);
  }
};
