'use server';

import { dbAdmin } from '../../lib/firebase-admin';

export const addArticle = async (content: string, clientId: string, title: string): Promise<void> => {
  try {
    const id = new Date().getTime().toString();
    const date = new Date();
    const collectionRef = dbAdmin.collection(`${clientId}`);
    await collectionRef.doc(title).set({ content, id, date });
    console.log('content added');
  } catch (error) {
    console.error('add-user.ts Error adding user:', error);
  }
};
