import { createBody } from './create-content-article/create-section/create-subtitle';
import { getListSubtitle } from './create-content-article/create-section/get-list-subtitle';
import { createContentForIntro } from './create-content-article/create-section/create-introduction';
import { createContentForClosure } from './create-content-article/create-section/create-closure';
import { preprocessJSON } from './preprocessJSON';
import { addArticle } from './firebase/add-article';
import { Locale, localesDetails } from '../types/languages';
import { improveBody } from './create-content-article/edit-article/improve-body';
import { editContent } from './create-content-article/edit-article/edit-content';
import { Timestamp } from 'firebase-admin/firestore';
import { Article } from '../types/article';
import { addSources } from './create-content-article/add-sources/add-souces';
import { createSEOTitle } from './create-content-article/create-title/create-seo-title';
import { createGreatestTitleEverMade } from './create-content-article/create-title/create-greatest-title';
// import { getContext } from './create-content-article/get-context';

export const createNewArticle = async ({
  mission,
  target_audience,
  source,
  clientId,
  lang,
  author,
  context,
}: {
  mission: string;
  target_audience: string;
  source: boolean;
  clientId: string;
  lang: Locale;
  author: string;
  context: string;
}) => {
  //fetch chat gpt api with gpt-4o-mini
  //Étape 1: getListSubtitle, créer une liste de sous-titres

  const language = localesDetails[lang].language;
  const seoTitle = (await createSEOTitle(context, target_audience, mission, lang)).replaceAll('"', '');
  const listSubtitle = await getListSubtitle(context, target_audience, mission, seoTitle, language);
  console.log('listSubtitle: ', listSubtitle);

  //Étape 2: First draft, créer le contenu pour chaque sous-titre en parallel

  const listDraft = await Promise.all(
    listSubtitle.map(async (subtitle) => {
      const index = listSubtitle.indexOf(subtitle);

      if (index === 0) {
        return await createContentForIntro(subtitle, mission, context, target_audience, listSubtitle);
      } else if (index === listSubtitle.length - 1) {
        return await createContentForClosure(subtitle, mission, context, target_audience, listSubtitle);
      } else {
        return await createBody(subtitle, mission, context, target_audience, listSubtitle);
      }
    }),
  );
  //console.log('content: ', content);

  //Étape 3: Final draft, créer le contenu final en faisant des liens dans le contenu (plus tard: aussi en ajoutant des liens internes)
  let body = listDraft.slice(1, -1).join('\n');
  console.log('draft finished');
  body = await improveBody(body, language, listSubtitle, context);
  let content = `${listDraft[0]}\n${body}\n${listDraft[listDraft.length - 1]}`;
  const greatestTitle = await createGreatestTitleEverMade(context, target_audience, mission, lang);
  content = await editContent(content, language, listSubtitle, greatestTitle, context);

  //Add sources if needed
  if (source) {
    content = await addSources(content, mission, context, target_audience);
  }

  content = preprocessJSON(content).replace('html', '');

  // const idMatch = content.match(/<h1 id="([^"]+)">/);
  const title = content.match(/<h1 id="[^"]+">(.+?)<\/h1>/)?.[1] ?? '';

  // const id = idMatch?.[1] ?? '';

  //const finalContent = createFinalContent(content); //TODO: Implementer cette fonction, retourne un article JSON, HTML ou plain text à voir
  // console.log('finalContent: ', finalContent);

  //Étape 4: Générer metadata tags (title, description, keywords, ++) et thumbnail pour le contenu final
  // const [metadata, thumbnail] = await Promise.all([
  //   //generateMetadata(finalContent),
  //   //generateThumbnail(finalContent),
  //   createNewImage(subject),
  // ]);

  //const thumbnail = await createNewImage(subject, clientId, id);
  const thumbnail = {
    url: '',
  };

  //Étape x: Améliorer le contenu final de x façons différentes (ex: ajouter des images avec Stock Free Images or AI generated images)
  console.log('draft improved');

  const article: Article = {
    id: seoTitle,
    title,
    content,
    thumbnail: thumbnail.url,
    author,
    // metadata,
    created: Timestamp.now(),
    published: false,
  };

  addArticle(article, clientId, lang);

  return {
    id: seoTitle,
    lang: lang,
  };
};
