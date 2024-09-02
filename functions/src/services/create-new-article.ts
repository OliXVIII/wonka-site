import { createBody } from './create-article/create-section/create-subtitle';
import { getListSubtitle } from './create-article/create-section/get-list-subtitle';
import { createContentForIntro } from './create-article/create-section/create-introduction';
import { createContentForClosure } from './create-article/create-section/create-closure';
import { preprocessJSON } from './preprocessJSON';
import { addArticle } from './firebase/add-article';
import { Locale, localesDetails } from '../types/languages';
import { improveBody } from './create-article/edit-article/improve-body';
import { editContent } from './create-article/edit-article/edit-content';
import { Timestamp } from 'firebase-admin/firestore';
import { Article } from '../types/article';
import { addSources } from './create-article/add-sources/add-souces';
import { createSEOTitle } from './create-article/create-title/create-seo-title';
import { createGreatestTitleEverMade } from './create-article/create-title/create-greatest-title';
import { createChartDataset } from './create-chart-dataset.ts/create-dataset';
import { addChartToArticle } from './create-article/edit-article/add-chart-to-article';
import { extractLabelAndTitleFromString } from './util/get-chart-info';
import { addInstructionToPrompt } from './add-instruction-to-prompt';
import { convertTitleToID } from './create-article/create-title/convert-title-to-id';
import { translatePrompt } from './translate-prompt';
// import { getContext } from './create-content-article/get-context';

export const createNewArticle = async ({
  mission,
  target_audience,
  source,
  clientId,
  lang,
  author,
  prompt,
  chart,
}: {
  mission: string;
  target_audience: string;
  source: boolean;
  clientId: string;
  lang: Locale;
  author: string;
  prompt: string;
  chart: boolean;
}) => {
  //fetch chat gpt api with gpt-4o-mini
  //Étape 1: getListSubtitle, créer une liste de sous-titres

  const language = localesDetails[lang].language;
  if (prompt.length < 70) {
    prompt = await addInstructionToPrompt(prompt);
  }

  if (language === 'en') {
    prompt = await translatePrompt(prompt);
  }

  //TODO: Might be good to use 4o instead of 4o-mini and turn this operation into a more crutial part of the following steps in using the title in combinasion with the prompt
  // Also, we should use this title for the h1 tag in the article
  const title = await createSEOTitle(prompt, target_audience, mission, lang);
  const id = convertTitleToID(title);

  const listSubtitle = await getListSubtitle(prompt, target_audience, mission, title, language);

  //Étape 2: First draft, créer le contenu pour chaque sous-titre en parallel
  const listDraft = await Promise.all(
    listSubtitle.map(async (subtitle) => {
      const index = listSubtitle.indexOf(subtitle);

      if (index === 0) {
        return await createContentForIntro(subtitle, mission, prompt, target_audience, listSubtitle);
      } else if (index === listSubtitle.length - 1) {
        return await createContentForClosure(subtitle, mission, prompt, target_audience, listSubtitle);
      } else {
        return await createBody(subtitle, mission, prompt, target_audience, listSubtitle);
      }
    }),
  );
  //console.log('content: ', content);

  //Étape 3: Final draft, créer le contenu final en faisant des liens dans le contenu (plus tard: aussi en ajoutant des liens internes)
  let body = listDraft.slice(1, -1).join('\n');
  console.log('draft finished');
  body = await improveBody(body, language, listSubtitle, prompt);
  let content = `${listDraft[0]}\n${body}\n${listDraft[listDraft.length - 1]}`;
  const greatestTitle = await createGreatestTitleEverMade(prompt, target_audience, mission, lang);
  content = await editContent(content, language, listSubtitle, greatestTitle, prompt);

  //Add sources if needed
  if (source) {
    content = await addSources(content, mission, prompt, target_audience);
  }

  content = preprocessJSON(content).replace('html', '');

  // const idMatch = content.match(/<h1 id="([^"]+)">/);
  // const title = content.match(/<h1 id="[^"]+">(.+?)<\/h1>/)?.[1] ?? '';

  // const id = idMatch?.[1] ?? '';

  //const finalContent = createFinalContent(content); //TODO: Implementer cette fonction, retourne un article JSON, HTML ou plain text à voir

  //Étape 4: Générer metadata tags (title, description, keywords, ++) et thumbnail pour le contenu final
  // TODO: Do this in parallel
  // const [metadata, chartDataset] = await Promise.all([
  //   generateMetadata(finalContent),
  //   hasChartDataset ? await createChartDataset({ prompt, lang }) : null,
  // ]);

  //const thumbnail = await createNewImage(subject, clientId, id);
  const thumbnail = {
    url: '',
  };

  //Étape x: Améliorer le contenu final de x façons différentes (ex: ajouter des images avec Stock Free Images or AI generated images)
  console.log('draft improved');
  let dataset;

  //TODO: This should be done in parallel
  if (chart) {
    //Add chart if needed
    const description = content.match(/<p(?: id="intro")?>(.+?)<\/p>/)?.[1] ?? '';
    dataset = await createChartDataset(prompt + ' ' + description, localesDetails[lang]);
    const chart_info = extractLabelAndTitleFromString(dataset);

    //TODO: This is very very slow and costly for no reason, maybe use the title and prompt to generate the chart or generate the chart in the same step as the content?
    //I don't have a good solution for this yet, but it's a problem
    content = preprocessJSON(await addChartToArticle(content, chart_info)).replaceAll('html', '');
    console.log('chart added');
  }
  const article: Article = {
    id,
    title,
    content,
    thumbnail: thumbnail.url,
    author,
    // metadata,
    created: Timestamp.now(),
    published: false,
    dataset: dataset,
    prompt: {
      content: prompt,
    },
  };

  await addArticle(article, clientId, lang);
  return id;
};
