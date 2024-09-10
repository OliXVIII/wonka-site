'use server';

import { dbAdmin } from '../../lib/firebase-admin';
import { openai } from '../../lib/open-ai';
import { Article } from '../../types/article';
import { Locale, localesDetails } from '../../types/languages';

const hardcodedClientLang = ['en', 'fr'] as Locale[];

export const addArticle = async (article: Article, clientId: string, lang: Locale): Promise<void> => {
  try {
    const docRef = dbAdmin.doc(`${clientId}/${lang}/articles/${article.id}`);

    if ((await docRef.get()).exists) {
      console.log('Document already exists, at second verification');
      return;
    }

    await docRef.set(article);

    for (const translateLang of hardcodedClientLang) {
      if (translateLang === lang) {
        continue;
      }

      await getTranslation(article, clientId, translateLang);
    }
  } catch (error) {
    console.error('add-article.ts: Error adding article:', error);
  }
};

//TODO: Finish this function, not working yet
export const getTranslation = async (article: Article, clientId: string, lang: Locale): Promise<void> => {
  const locale = localesDetails[lang];
  const prompts = {
    system: `You are TranslateAI. Your task is to rewrite it in ${locale.language}.
    The purpose here is to outline the same information in a different language while adapting to the language's specificities.
    Dont be too literal, make it sound natural.
    Make sure the headline is catchy.`,
    user: `Translate this article into ${locale.language}:
    ${JSON.stringify({ ...article, id: undefined, author: undefined, published: undefined })}`,
  };

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: prompts.system,
      },
      {
        role: 'user',
        content: prompts.user,
      },
    ],
    response_format: { type: 'json_object' },
  });

  const content = completion.choices[0].message?.content;

  if (!content) {
    throw new Error('Failed to generate a translation');
  }

  const data = JSON.parse(content) as Article;
  data.id = article.id;
  data.author = article.author;
  data.published = false;

  const docRefTranslate = dbAdmin.doc(`${clientId}/${lang}/articles/${data.id}`);

  await docRefTranslate.set(data);
  // await docRef.set({ translations: { [lang]: data.id } }, { merge: true });
};
