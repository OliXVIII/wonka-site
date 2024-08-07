import { createContentForSubtitle } from './create-content-article/create-section/create-subtitle';
import { getListSubtitle } from './create-content-article/create-section/get-list-subtitle';
import { createContentForIntro } from './create-content-article/create-section/create-introduction';
import { createContentForClosure } from './create-content-article/create-section/create-closure';
import { preprocessJSON } from './preprocessJSON';
import { addArticle } from './firebase/add-article';
import { Locale, localesDetails } from '../types/languages';
import { improveIntro } from './create-content-article/edit-article/improve-intro';
import { improveConclusion } from './create-content-article/edit-article/improve-conclusion';
import { improveBody } from './create-content-article/edit-article/improve-body';
import { editContent } from './create-content-article/edit-article/edit-content';
import { createNewImage } from './create-image/create-new-image';
import { Timestamp } from 'firebase-admin/firestore';
import { Article } from '../types/article';
import { addSources } from './create-content-article/add-sources/add-souces';

export const createNewArticle = async (
  mission: string,
  subject: string,
  target_audience: string,
  source: boolean,
  clientId: string,
  lang: Locale,
  author?: string,
) => {
  //fetch chat gpt api with gpt-4o-mini
  //Étape 1: getListSubtitle, créer une liste de sous-titres

  const listSubtitle = await getListSubtitle(subject, target_audience, mission);
  console.log('listSubtitle: ', listSubtitle);

  //Étape 2: First draft, créer le contenu pour chaque sous-titre en parallel

  let language = localesDetails[lang].language;

  const listDraft = await Promise.all(
    listSubtitle.map(async (subtitle) => {
      const index = listSubtitle.indexOf(subtitle);

      if (index === 0) {
        const intro = await createContentForIntro(subtitle, mission, subject, target_audience, listSubtitle);
        return await improveIntro(intro, mission, subject, target_audience, language);
      } else if (index === listSubtitle.length - 1) {
        const conclusion = await createContentForClosure(subtitle, mission, subject, target_audience, listSubtitle);
        return await improveConclusion(conclusion, mission, subject, target_audience, language);
      } else {
        const content = await createContentForSubtitle(subtitle, mission, subject, target_audience, listSubtitle);
        return await improveBody(content, mission, subject, target_audience, language);
      }
    }),
  );
  //console.log('content: ', content);

  //Étape 3: Final draft, créer le contenu final en faisant des liens dans le contenu (plus tard: aussi en ajoutant des liens internes)
  const draft = listDraft.join('\n');
  console.log('draft finished');

  let content = await editContent(draft, language, target_audience);

  //Add sources if needed
  if (source) {
    content = await addSources(content, mission, subject, target_audience);
  }

  content = preprocessJSON(content).replace('html', '');

  const idMatch = content.match(/<h1 id="([^"]+)">/);
  const title = content.match(/<h1 id="[^"]+">(.+?)<\/h1>/)?.[1] ?? '';

  const id = idMatch?.[1] ?? '';

  //const finalContent = createFinalContent(content); //TODO: Implementer cette fonction, retourne un article JSON, HTML ou plain text à voir
  // console.log('finalContent: ', finalContent);

  //Étape 4: Générer metadata tags (title, description, keywords, ++) et thumbnail pour le contenu final
  // const [metadata, thumbnail] = await Promise.all([
  //   //generateMetadata(finalContent),
  //   //generateThumbnail(finalContent),
  //   createNewImage(subject),
  // ]);

  const thumbnail = await createNewImage(subject, clientId, id);

  //Étape x: Améliorer le contenu final de x façons différentes (ex: ajouter des images avec Stock Free Images or AI generated images)
  console.log('draft improved');

  const article: Article = {
    id,
    title,
    content,
    thumbnail: thumbnail.url,
    author,
    // metadata,
    created: Timestamp.now(),
  };
  addArticle(article, clientId, lang);

  return content;
};
