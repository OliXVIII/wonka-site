'use server';

import { dbAdmin } from '../../lib/firebase-admin';
import { Article } from '../../types/article';

export const addArticle = async (article: Article, clientId: string, lang: string): Promise<void> => {
  try {
    const date = new Date();
    const collectionRef = dbAdmin.collection(`${clientId}/${lang}/articles`);
    await collectionRef.doc(article.id).set(article);
    console.log(
      'content added at path:',
      `${clientId}/${lang}/articles/${article.id}`,
      'in',
      new Date().getTime() - date.getTime(),
      'ms',
    );
  } catch (error) {
    console.error('add-user.ts Error adding user:', error);
  }
};
