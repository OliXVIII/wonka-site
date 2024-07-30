// 'use server';

// import { dbAdmin } from '../../lib/firebase-admin';

// export const addUser = async (domain: string, email: string, userId: string, name: string, imageURL: string): Promise<void> => {
//   try {
//     const collectionRef = dbAdmin.collection(`domain/${domain}/users`);

//     const userData = {
//       userId,
//       email,
//       name,
//       imageURL,
//       role: 'user',
//     };
//     await collectionRef.doc(userId).set(userData);
//   } catch (error) {
//     console.error('add-article.ts: error adding article', error);
//   }
// };
