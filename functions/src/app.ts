import express from 'express';
import bodyParser from 'body-parser';
import { createNewArticle } from './services/create-new-article';

const app = express();

app.use(bodyParser.json());

app.get('/createNewArticle', (req: express.Request, res: express.Response) => {
  const { mission, subject } = req.body;

  if (!mission || !subject) {
    res.status(400).send('Missing required parameters');
    return;
  }

  createNewArticle({ mission, subject });

  res.status(200).send(`Creating new article for ${mission} on ${subject}`);
});

//http://127.0.0.1:5001/wonkasite-d43b5/us-central1/app/ping
app.get('/ping', (req: express.Request, res: express.Response) => {
  res.status(200).send('Pong');
});

//export app for firebase functions
export default app;
