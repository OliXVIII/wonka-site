import { dbAdmin } from '../lib/firebase-admin';
import { ClientInfo } from '../types/client-info';
import { createNewArticle } from './create-new-article';
import { createdArticleEmail } from './email/cronjob-email';
import { handleNewNextIdeas } from './handleNewNextIdeas';

export const handleNewPost = async (clientId: string) => {
  const path_info = `${clientId}/info`;
  const clientInfoRef = dbAdmin.doc(path_info);
  const ClientInfo = await clientInfoRef.get();
  if (!ClientInfo.exists) {
    console.log('Client info does not exist');
    return;
  }
  const clientData = ClientInfo.data();
  if (!clientData) {
    console.log('Client data does not exist');
    return;
  }

  let { mission, nextIdeas, targetAudience = 'general', defaultAuthor, CTA = '', domain } = clientData as ClientInfo;

  const prompt = nextIdeas?.[0].title;

  if (!prompt) {
    console.log('No prompt found');
    return;
  }
  const articleId =
    (await createNewArticle({
      author: defaultAuthor ?? 'InceptionAI',
      clientId,
      domain,
      mission,
      prompt,
      targetAudience,
      CTA,
    })) ?? '';

  if (!articleId) {
    console.log('Error creating article');
    return;
  }
  // await handleNewNextIdeas(clientId, mission, targetAudience);
  await createdArticleEmail(clientId, 'en', articleId);
};
