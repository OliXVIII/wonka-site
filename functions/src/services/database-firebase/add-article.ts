'use server';

import { dbAdmin } from '../../lib/firebase-admin';

export const addArticle = async (
  content: string,
  clientId: string,
  title: string,
  lang: string,
  author?: string,
): Promise<void> => {
  try {
    const id = title;
    const date = new Date();
    const collectionRef = dbAdmin.collection(`${clientId}/${lang}/articles`);
    if (author) {
      await collectionRef.doc(title).set({ content, id, date, author });
    } else {
      await collectionRef.doc(title).set({ content, id, date });
    }
    console.log('content added at path:', `${clientId}/${lang}/articles/${title}`);
  } catch (error) {
    console.error('add-user.ts Error adding user:', error);
  }
};
