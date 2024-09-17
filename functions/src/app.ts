import express from 'express';
import bodyParser from 'body-parser';
import { createNewArticle } from './services/create-new-article';
import { Locale, isValidLanguage, localesDetails } from './types/languages';
import { generateLinkedinPost } from './services/create-post/create-linkedin-post';
import { dbAdmin } from './lib/firebase-admin';
import { sendEmail } from './services/send-email';
import { emailContent } from './lib/email';
import { deleteAllUnpublishedArticles, deleteUnpublishedArticle } from './services/firebase/delete-article-not-published';
import { createChartDataset } from './services/create-chart-dataset.ts/create-dataset';
import { get100Ideas } from './services/ideas/get-100-ideas';
import { ClientInfo } from './types/client-info';
import { createImage } from './services/create-image/create-image';
import { v4 as uuidv4 } from 'uuid';
import { getNextArticleIdeas } from './services/ideas/get-next-article-idea';
import { getTranslation } from './services/firebase/add-article';
import { Article } from './types/article';
import { generateTwitterPost } from './services/create-post/create-twitter-post';

const app = express();

app.use(bodyParser.json());

//TODO: recall get100ideas if ideas is empty
app.post('/createNewArticle', async (req: express.Request, res: express.Response) => {
  let {
    prompt,
    source = false,
    clientId,
    lang,
    author,
    chart = true,
  } = req.body as {
    prompt: string;
    source: boolean;
    clientId: string;
    lang: Locale;
    author?: string;
    chart: boolean;
  };
  const path_info = `${clientId}/info`;
  const info = await dbAdmin.doc(path_info).get();

  if (!info.exists) {
    res.status(400).send('Client not found');
    return;
  }

  const { mission, ideas, targetAudience = 'general', default_author, CTA, domain } = info.data() as ClientInfo;

  if (!mission || !targetAudience || !default_author) {
    res.status(400).send('Client incomplete');
    return;
  }

  if (!author) {
    author = default_author;
  }

  if (!mission || (!prompt && !ideas) || !clientId || !lang) {
    res.status(400).send('Missing required parameters');
    return;
  }

  if (!prompt && ideas.length > 0) {
    const randomIndex = Math.floor(Math.random() * ideas.length);
    prompt = ideas[randomIndex];
    console.log('No prompt, idea picked: ', prompt);
    ideas.splice(randomIndex, 1);
    await dbAdmin.doc(path_info).update({
      ideas: ideas,
    });
    // addInstructions = true;
  }
  if (!isValidLanguage(lang)) {
    res.status(400).send('Invalid language');
    return;
  }

  const id = await createNewArticle({
    mission,
    targetAudience,
    source,
    clientId,
    lang,
    author,
    prompt,
    chart,
    CTA,
    domain,
  });

  res.status(200).send({ id, lang });
});

app.post('/updateImage', async (req: express.Request, res: express.Response) => {
  let { title, clientId, id, lang } = req.body as {
    title: string;
    clientId: string;
    lang: string;
    id: string;
  };
  const path_info = `${clientId}/info`;
  const info = await dbAdmin.doc(path_info).get();
  const clientInfo = info.data() as ClientInfo | undefined;

  if (!title || !clientId || !id || !lang) {
    res.status(401).send('Article not found');
    return;
  }
  const snapshot = await dbAdmin.doc(`${clientId}/${lang}/articles/${id}`).get();

  if (!snapshot.exists) {
    res.status(400).send('Article not found');
    return;
  }

  const { url, prompt } = await createImage({ subject: title, clientInfo, clientId });

  snapshot.ref.update({ thumbnail: url, prompt: { thumbnail: prompt } });

  res.status(200).send(`Successfully updated image for article ${id}`);
});

app.post('/publish', async (req: express.Request, res: express.Response) => {
  let { href, clientId, lang, id } = req.body as {
    href: string;
    clientId: string;
    lang: Locale;
    id: string;
    thumbnail?: string;
  };

  if (!href || !clientId) {
    res.status(400).send('Missing required parameters');
    return;
  }

  const snapshot = await dbAdmin.doc(`${clientId}/${lang}/articles/${id}`).get();

  if (!snapshot.exists) {
    res.status(400).send('Article not found');
    return;
  }

  const data = snapshot.data();

  if (!data) {
    res.status(400).send('Article not found');
    return;
  }

  const html = data?.content as string;
  let image = data?.thumbnail
    ? data.thumbnail
    : 'https://firebasestorage.googleapis.com/v0/b/inceptionai-61b20.appspot.com/o/images%2FtestId%2Fstate-of-seo-in-2024%3A-trends-and-predictions.png?alt=media&token=aab4aafc-3543-42bc-aab5-055fa7f10e41';
  const title = data?.content.match(/<h1(?: id="[^"]+")?>(.+?)<\/h1>/)?.[1] ?? '';

  console.log('title', title);

  if (!html) {
    res.status(400).send('Article not found or missing content');
    return;
  }

  if (!data?.thumbnail) {
    const path_info = `${clientId}/info`;
    const info = await dbAdmin.doc(path_info).get();

    try {
      const clientInfo = info.data() as ClientInfo | undefined;

      const { url, prompt } = await createImage({ subject: title, clientInfo, clientId });

      data.thumbnail = url;
      data.prompt.thumbnail = prompt;
      image = url;
    } catch (error: any) {
      console.error('/publish: Error creating image:', error.message);
    }
  }

  const linkedinPost = await generateLinkedinPost(html, image, href, localesDetails[lang]);

  const twitterPost = await generateTwitterPost(html, href, localesDetails[lang]);

  const email = emailContent({ lang, subject: title, linkedinPost, twitterPost, href });

  if (!email) {
    res.status(400).send('Failed to generate email content');
    return;
  }

  await sendEmail(email);

  await snapshot.ref.update({ published: true, thumbnail: data.thumbnail });
  await snapshot.ref.set({ prompt: { thumbnail: data.prompt.thumbnail } }, { merge: true });

  for (const translateLang of ['en', 'fr'] as Locale[]) {
    if (translateLang === lang) {
      continue;
    } else {
      const translateSnapshot = await dbAdmin.doc(`${clientId}/${translateLang}/articles/${id}`).get();

      if (translateSnapshot.exists) {
        await translateSnapshot.ref.update({ published: true, thumbnail: data.thumbnail });
        await translateSnapshot.ref.set({ prompt: { thumbnail: data.prompt.thumbnail } }, { merge: true });
      }
    }
  }

  res.status(200).send('New article published');
});

app.post('/unpublish', async (req: express.Request, res: express.Response) => {
  //    body: JSON.stringify({ lang: lang.slice(0, 2), id, secret }),
  let { lang, id, clientId, secret } = req.body as {
    clientId: string;
    lang: 'en' | 'fr';
    id: string;
    secret: string;
  };

  if (secret !== 'secret') {
    console.log('Invalid secret');
    res.status(400).send('Error while unpublishing article');
    return;
  }

  if (!clientId) {
    console.log('Missing required parameters');
    res.status(400).send('Error while unpublishing article');
    return;
  }

  const snapshot = await dbAdmin.doc(`${clientId}/${lang}/articles/${id}`).get();

  if (!snapshot.exists) {
    console.log('Article not found');
    res.status(400).send('Error while unpublishing article');
    return;
  }

  snapshot.ref.update({ published: false });

  res.status(200).send('Article unpublished');
});

app.delete('/deleteUnpublishedArticle', async (req: express.Request, res: express.Response) => {
  const { clientId, lang, secret, id } = req.body as {
    clientId: string;
    lang: Locale;
    secret: string;
    id: string;
  };

  if (!clientId || !lang || !id) {
    res.status(400).send('Missing required parameters');
    return;
  }

  if (secret !== 'secret') {
    console.log('Invalid secret');
    res.status(400).send("Invalid secret, stop trying to hack me. Please don't do that.");
    return;
  }
  try {
    await deleteUnpublishedArticle(clientId, lang, id);
    res.status(200).send('Unpublished article deleted successfully.');
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).send('Error deleting article');
  }
});

app.delete('/deleteAllUnpublishedArticle', async (req: express.Request, res: express.Response) => {
  const { clientId, lang, secret } = req.body as {
    clientId: string;
    lang: Locale;
    secret: string;
  };
  if (!clientId || !lang) {
    res.status(400).send('Missing required parameters');
    return;
  }
  if (secret !== 'secret') {
    console.log('Invalid secret');
    res.status(400).send("Invalid secret, stop trying to hack me. Please don't do that.");
    return;
  }
  try {
    await deleteAllUnpublishedArticles(clientId, lang);

    //TODO: delete all translations ?
    res.status(200).send('All unpublished articles deleted successfully.');
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).send('Error deleting all articles');
  }
});

app.get('/update-chart-dataset', async (req: express.Request, res: express.Response) => {
  const { clientId, lang, id } = req.body as { clientId: string; lang: Locale; id: string };

  if (!clientId || !lang || !id) {
    res.status(400).send('Missing required parameters');
    return;
  }

  const docRef = dbAdmin.doc(`${clientId}/${lang}/articles/${id}`);

  const snapshot = await docRef.get();

  if (!snapshot.exists) {
    res.status(400).send('Article not found');
    return;
  }

  const context = snapshot.data()?.content as string;

  const locale = localesDetails[lang];

  const dataset = await createChartDataset(context, locale);

  await docRef.update({ dataset });

  res.status(200).send(dataset);
});

app.post('/get-translations', async (req: express.Request, res: express.Response) => {
  const { clientId, lang, id } = req.body as { clientId: string; lang: Locale; id: string };
  const snapshot = await dbAdmin.doc(`${clientId}/${lang}/articles/${id}`).get();

  if (!snapshot.exists) {
    res.status(400).send('Article not found');
    return;
  }
  const article = snapshot.data() as Article | undefined;

  if (!article) {
    res.status(400).send('Article not found');
    return;
  }

  const hardcodedClientLang = ['en', 'fr'] as Locale[];

  for (const translateLang of hardcodedClientLang) {
    if (translateLang === lang) {
      continue;
    } else {
      await getTranslation(article, clientId, translateLang);
    }
  }
  res.status(200).send('Translations generated');
});

app.get('/get-100-ideas', async (req: express.Request, res: express.Response) => {
  const { clientId } = req.body as { clientId: string; subject: string };

  if (!clientId) {
    res.status(400).send('Missing clientId');
    return;
  }

  const docRef = dbAdmin.doc(`${clientId}/info`);

  const snapshot = await docRef.get();

  if (!snapshot.exists) {
    res.status(400).send('Language or clientId not found');
    return;
  }
  const { mission, targetAudience } = snapshot.data() as { mission: string; targetAudience: string };

  const data = await get100Ideas(mission, targetAudience);

  await docRef.update({ ideas: data });

  res.status(200).send(data);
});

app.get('/ping', async (req: express.Request, res: express.Response) => {
  res.status(200).send('Pong');
});

//export app for firebase functions
export default app;

//TODO number left
app.post('/setupClient', async (req: express.Request, res: express.Response) => {
  console.log('req.body', req.body);
  let { mission, companyName, targetAudience, imageStyle, CTA = '', domain = '', clientId } = req.body as ClientInfo;

  if (clientId) {
    const docRef = dbAdmin.doc(`${clientId}/info`);
    const snapshot = await docRef.get();
    if (snapshot.exists) {
      const data = snapshot.data() as ClientInfo;
      res.status(200).send(data);
      return;
    }
  }
  clientId = uuidv4();
  const docRef = dbAdmin.doc(`${clientId}/info`);

  let ideas100 = await get100Ideas(mission, targetAudience);
  const nextIdeas = await getNextArticleIdeas(ideas100, mission, targetAudience);
  ideas100 = ideas100.filter((idea) => !nextIdeas.includes(idea));

  const info = {
    mission,
    companyName,
    targetAudience,
    imageStyle,
    ideas: ideas100,
    domain,
    CTA,
    nextIdeas,
  };
  docRef.set(info);
  res.status(200).send({ ...info, clientId });
});
