'use server';

import { dbAdmin } from '../../lib/firebase-admin';
import { Article } from '../../types/article';
import { Locale } from '../../types/languages';

export const addChartDataset = async (article: Article, dataset: string, clientId: string, lang: Locale): Promise<void> => {
  try {
    const docRef = dbAdmin.doc(`${clientId}/${lang}/articles/${article.id}`);

    await docRef.update({ dataset: dataset });
  } catch (error) {
    console.error('add-article.ts: Error adding article:', error);
  }
};
