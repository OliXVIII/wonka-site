'use server';

import { dbAdmin } from '../../lib/firebase-admin';

export const deleteArticleNotPublished = async (clientId: string, lang: string, id?: string): Promise<void> => {
  try {
    if (id) {
      const articleRef = dbAdmin.doc(`${clientId}/${lang}/articles/${id}`);
      const doc = await articleRef.get();

      if (!doc.exists) {
        console.log('No such document!');
        return;
      }

      if (!doc.data()?.published) {
        await articleRef.delete();
        console.log('Document successfully deleted!');
      } else {
        console.log('Document is published, cannot delete');
      }

      return;
    }
    const articlesRef = dbAdmin.collection(`${clientId}/${lang}/articles`);
    // Query for articles where published is not true or where the field doesn't exist
    const snapshot = await articlesRef.where('published', '==', false).get();

    console.log(snapshot.empty);

    if (snapshot.empty) {
      console.log('No unpublished articles found.');
      return;
    }

    const batch = dbAdmin.batch();

    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log('Unpublished articles deleted successfully.');
  } catch (error) {
    console.error('delete-article-not-published.ts Error deleting article:', error);
  }
};
