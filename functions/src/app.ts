import express from 'express';
import bodyParser from 'body-parser';
import { createNewArticle } from './services/create-new-article';
import { createNewImage } from './services/create-image/create-new-image';
import { isValidLanguage } from './types/languages';
import { createContentForClosure } from './services/create-linkedin-post/create-linkedin-post';
import { dbAdmin } from './lib/firebase-admin';

const app = express();

app.use(bodyParser.json());

app.get('/createNewArticle', async (req: express.Request, res: express.Response) => {
  const { mission, subject, target_audience = 'general', source, clientId, lang, author } = req.body;

  if (!mission || !subject || !clientId || !lang) {
    res.status(400).send('Missing required parameters');
    return;
  }

  if (!isValidLanguage(lang)) {
    res.status(400).send('Invalid language');
    return;
  }

  const article = await createNewArticle(mission, subject, target_audience, source, clientId, lang, author);

  res.status(200).send(`${article}`);
});

app.get('/createNewImage', async (req: express.Request, res: express.Response) => {
  let { subject } = req.body;

  if (!subject) {
    res.status(400).send('Missing required parameters');
    return;
  }

  const { picture, url } = await createNewImage(subject, 'testId', subject.replace(/ /g, '-').toLowerCase());

  res.status(200).send(`Creating new image at url ${url}: ${picture}`);
});

app.get('/createLinkinPost', async (req: express.Request, res: express.Response) => {
  let { href, clientId, lang } = req.body;

  if (!href || !clientId) {
    res.status(400).send('Missing required parameters');
    return;
  }

  const id = href.split('/').pop();

  const snapshot = await dbAdmin.doc(`${clientId}/${lang}/articles/${id}`).get();

  if (!snapshot.exists) {
    res.status(400).send('Article not found');
    return;
  }

  const data = snapshot.data();
  const content = data?.content as string;
  const image = data?.thumbnail as string;

  if (!content || !image) {
    res.status(400).send('Article not found');
    return;
  }

  const linkedinPost = createContentForClosure(content, image);

  console.log('linkedinPost: ', linkedinPost);

  res.status(200).send('Creating new linkedin post');
});

//export app for firebase functions
export default app;
