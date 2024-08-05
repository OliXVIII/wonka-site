'use server';

import { dbAdmin } from '../../lib/firebase-admin';

export const addArticle = async (content: string, clientId: string, title: string, lang: string): Promise<void> => {
  try {
    const id = title;
    const date = new Date();
    const collectionRef = dbAdmin.collection(`${clientId}/${lang}/articles`);
    await collectionRef.doc(title).set({ content, id, date });
    console.log('content added');
  } catch (error) {
    console.error('add-user.ts Error adding user:', error);
  }
};
