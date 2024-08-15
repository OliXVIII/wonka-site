import { dbAdmin } from '../../lib/firebase-admin';

// Function to delete a specific unpublished article by ID
export const deleteUnpublishedArticle = async (clientId: string, lang: string, id: string): Promise<void> => {
  try {
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
  } catch (error) {
    console.error('deleteUnpublishedArticle.ts Error deleting article:', error);
  }
};

// Function to delete all unpublished articles
export const deleteAllUnpublishedArticles = async (clientId: string, lang: string): Promise<void> => {
  try {
    const articlesRef = dbAdmin.collection(`${clientId}/${lang}/articles`);
    // Query for articles where published is not true or where the field doesn't exist
    const snapshot = await articlesRef.where('published', '==', false).get();

    if (snapshot.empty) {
      console.log('No unpublished articles found.');
      return;
    }

    const batch = dbAdmin.batch();

    snapshot.forEach((doc) => {
      if (!doc.data()?.published) {
        batch.delete(doc.ref);
      }
    });

    await batch.commit();
    console.log('Unpublished articles deleted successfully.');
  } catch (error) {
    console.error('deleteAllUnpublishedArticles.ts Error deleting articles:', error);
  }
};
