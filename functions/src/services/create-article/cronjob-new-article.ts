import { Timestamp } from 'firebase-admin/firestore';
import { dbAdmin } from '../../lib/firebase-admin';
import { ClientInfo } from '../../types/client-info';
import { createNewArticle } from '../create-new-article';
import { createdArticleEmail } from '../email/cronjob-email';
// import { handleNewNextIdeas } from '../ideas/remove-new-next-ideas';

export const handleNewArticle = async (clientId: string, date: Timestamp) => {
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

  // Find the prompt where idea.date is the same day as date
  const prompt = nextIdeas?.find((idea) => {
    const ideaDate = new Date(idea.date.toMillis());
    const targetDate = new Date(date.toMillis());

    const isSameDay =
      ideaDate.getFullYear() === targetDate.getFullYear() &&
      ideaDate.getMonth() === targetDate.getMonth() &&
      ideaDate.getDate() === targetDate.getDate();

    return isSameDay;
  })?.title;

  if (!prompt) {
    return;
  }

  console.log('creating article');
  const id = await createNewArticle({
    author: defaultAuthor ?? 'InceptionAI',
    clientId,
    domain,
    mission,
    prompt,
    targetAudience,
    CTA,
    lang: 'en',
  });
  if (!id) {
    console.log('Error creating article');
    return;
  }
  // await handleNewNextIdeas(clientId, mission, targetAudience);
  await createdArticleEmail(clientId, 'en', id);
  console.log('Article created and email sent, congrats!');
  return;
};
