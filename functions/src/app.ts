import express from 'express';
import bodyParser from 'body-parser';
import { createNewArticle } from './create-new-article';
import { createNewImage } from './services/create-image/create-new-image';
import { isValidLanguage } from './types/languages';

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
  console.log('subject', subject);

  if (!subject) {
    res.status(400).send('Missing required parameters');
    return;
  }

  const { picture, url } = await createNewImage(subject);

  res.status(200).send(`Creating new image at url ${url}: ${picture}`);
});

//http://127.0.0.1:5001/wonkasite-d43b5/us-central1/app/ping
app.get('/ping', (req: express.Request, res: express.Response) => {
  res.status(200).send('Pong');
});

//export app for firebase functions
export default app;
