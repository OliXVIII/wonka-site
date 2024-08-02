'use server';

import { dbAdmin } from '../../lib/firebase-admin';

export const addArticle = async (content: string): Promise<void> => {
  try {
    const id = new Date().getTime().toString();
    const date = new Date();
    const collectionRef = dbAdmin.doc(`articles/${id}`);
    await collectionRef.set({ content, date });
    console.log('content added');
  } catch (error) {
    console.error('add-user.ts Error adding user:', error);
  }
};
