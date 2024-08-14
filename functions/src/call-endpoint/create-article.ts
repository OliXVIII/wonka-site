'use server';

import { Locale } from '../types/languages';

const url =
  process.env.DEV_DEVELOPMENT === 'true'
    ? 'http://127.0.0.1:5001/wonkasite-d43b5/us-central1/app'
    : 'https://us-central1-wonkasite-d43b5.cloudfunctions.net/app';

export const PublishArticle = async ({
  lang,
  clientId,
  source,
  prompt,
}: {
  lang: Locale;
  clientId: string;
  source: boolean;
  prompt: string;
}): Promise<any> => {
  await fetch(`${url}/createNewArticle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ source, clientId, lang, prompt }),
  })
    .then(async (response) => {
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      } else {
        return response.json();
      }
    })
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.log('Failed:', error.message);
    });

  return { status: 'success' };
};
