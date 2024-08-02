import { createContentForSubtitle } from './services/create-content-article/create-section/create-subtitle';
import { getListSubtitle } from './services/create-content-article/create-section/get-list-subtitle';
import { createContentForIntro } from './services/create-content-article/create-section/create-introduction';
import { createContentForClosure } from './services/create-content-article/create-section/create-closure';
import { improveDraft } from './services/create-content-article/improve-draft';
import { preprocessJSON } from './services/preprocessJSON';
import { addSources } from './services/create-content-article/add-sources/add-souces';
import { addArticle } from './services/database-firebase/add-article';

export const createNewArticle = async (
  mission: string,
  subject: string,
  target_audiance: string,
  source: boolean,
  section: string,
) => {
  //fetch chat gpt api with gpt-4o-mini
  //Étape 1: getListSubtitle, créer une liste de sous-titres

  const listSubtitle = await getListSubtitle(subject, target_audiance, section);
  console.log('listSubtitle: ', listSubtitle);

  //Étape 2: First draft, créer le contenu pour chaque sous-titre en parallel

  const listDraft = await Promise.all(
    listSubtitle.map(async (subtitle) => {
      //Créer le contenu pour chaque sous-titre
      // return {
      //   content: 'example',
      //   //imageTitle: 'White poney', //optional et plus tard
      // };
      if (subtitle.toLowerCase().includes('introduction')) {
        return createContentForIntro(subtitle, mission, subject, target_audiance, listSubtitle);
      } else if (subtitle.toLowerCase().includes('conclusion' || 'closure')) {
        return createContentForClosure(subtitle, mission, subject, target_audiance, listSubtitle);
      }
      const content = await createContentForSubtitle(subtitle, mission, subject, target_audiance);
      return content;
    }),
  );
  //console.log('content: ', content);

  //Étape 3: Final draft, créer le contenu final en faisant des liens dans le contenu (plus tard: aussi en ajoutant des liens internes)
  const draft = listDraft.join('\n');
  console.log('draft finished');

  let content = await improveDraft(draft, mission, subject, target_audiance);
  if (source) {
    content = await addSources(content, mission, subject, target_audiance);
  }

  //const finalContent = createFinalContent(content); //TODO: Implementer cette fonction, retourne un article JSON, HTML ou plain text à voir
  // console.log('finalContent: ', finalContent);

  //Étape 4: Générer meta tags pour le contenu final

  //Étape x: Améliorer le contenu final de x façons différentes (ex: ajouter des images avec Stock Free Images or AI generated images)
  console.log('draft improved');
  content = preprocessJSON(content).replace('html', '');
  addArticle(content);
  return content;
  //Étape 5: Publier le contenu sur dans la base de donnée
};
