import express from 'express';
import bodyParser from 'body-parser';
import { createNewArticle } from './services/create-new-article';
import { createNewImage } from './services/create-image/create-new-image';
import { Locale, isValidLanguage, localesDetails } from './types/languages';
import { generateLinkedinPost } from './services/create-linkedin-post/create-linkedin-post';
import { dbAdmin } from './lib/firebase-admin';
import { sendEmail } from './services/send-email';
import { emailContent } from './lib/email';
import { deleteAllUnpublishedArticles, deleteUnpublishedArticle } from './services/firebase/delete-article-not-published';
import { createChartDataset } from './services/create-chart-dataset.ts/create-dataset';
import { get100Ideas } from './services/get-100-ideas/get-100-ideas';

const app = express();

app.use(bodyParser.json());

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

  const info = await dbAdmin.doc(`${clientId}/info`).get();

  if (!info.exists) {
    res.status(400).send('Client not found');
    return;
  }

  const {
    mission,
    target_audience = 'general',
    default_author,
  } = info.data() as { mission: string; target_audience: string; default_author: string };

  if (!mission || !target_audience || !default_author) {
    res.status(400).send('Client incomplete');
    return;
  }

  if (!author) {
    author = default_author;
  }

  if (!mission || !prompt || !clientId || !lang) {
    res.status(400).send('Missing required parameters');
    return;
  }

  if (!isValidLanguage(lang)) {
    res.status(400).send('Invalid language');
    return;
  }

  const id = await createNewArticle({
    mission,
    target_audience,
    source,
    clientId,
    lang,
    author,
    context: prompt,
    chart,
  });

  res.status(200).send({ id, lang });
});

app.get('/createNewImage', async (req: express.Request, res: express.Response) => {
  let { subject } = req.body;

  if (!subject) {
    res.status(400).send('Missing required parameters');
    return;
  }

  const { picture } = await createNewImage(subject, 'testId', subject.replace(/ /g, '-').toLowerCase());

  res.status(200).send(`${picture}`);
});

app.post('/publish', async (req: express.Request, res: express.Response) => {
  let { href, clientId, lang, id } = req.body as {
    href: string;
    clientId: string;
    lang: 'en' | 'fr';
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
  const image = data?.thumbnail
    ? data.thumbnail
    : 'https://firebasestorage.googleapis.com/v0/b/inceptionai-61b20.appspot.com/o/images%2FtestId%2Fstate-of-seo-in-2024%3A-trends-and-predictions.png?alt=media&token=aab4aafc-3543-42bc-aab5-055fa7f10e41';
  const title = data?.content.match(/<h1(?: id="[^"]+")?>(.+?)<\/h1>/)?.[1] ?? '';

  console.log('title', title);

  if (!html) {
    res.status(400).send('Article not found or missing content');
    return;
  }

  const linkedinPost = await generateLinkedinPost(html, image, href);

  // if (!data?.thumbnail) {
  //   const { url } = await createNewImage(title, clientId, id);

  //   data.thumbnail = url;
  // }

  const email = emailContent({ lang, subject: title, linkedinPost, href });

  if (!email) {
    res.status(400).send('Failed to generate email content');
    return;
  }

  await sendEmail(email);

  snapshot.ref.update({ published: true, thumbnail: data.thumbnail });

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
    res.status(200).send('All unpublished articles deleted successfully.');
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).send('Error deleting all articles');
  }
});

app.get('/create-chart-dataset', async (req: express.Request, res: express.Response) => {
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

  const data = await createChartDataset(context, locale);

  await docRef.update({ dataset: data });

  res.status(200).send(data);
});

app.get('/get-100-ideas', async (req: express.Request, res: express.Response) => {
  const { clientId, lang, subject } = req.body as { clientId: string; lang: Locale; subject: string };

  if (!clientId || !lang || !subject) {
    res.status(400).send('Missing required parameters');
    return;
  }

  const docRef = dbAdmin.doc(`${clientId}/${lang}`);

  const snapshot = await docRef.get();

  if (!snapshot.exists) {
    res.status(400).send('Language or clientId not found');
    return;
  }
  const { mission, target_audience } = snapshot.data() as { mission: string; target_audience: string };
  const locale = localesDetails[lang];

  const data = await get100Ideas(subject, locale, mission, target_audience);

  await docRef.update({ ideas: data });

  res.status(200).send(data);
});

app.get('/ping', async (req: express.Request, res: express.Response) => {
  res.status(200).send('Pong');
});

//export app for firebase functions
export default app;
