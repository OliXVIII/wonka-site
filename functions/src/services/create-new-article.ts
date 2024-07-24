import { createContentForSubtitle } from './create-content-article/create-subtitle';
import { getListSubtitle } from './get-list-subtitle';
import { createContentForIntro } from './create-content-article/create-introduction';
import { createContentForClosure } from './create-content-article/create-closure';
import { improveDraft } from './create-content-article/improve-draft';

export const createNewArticle = async ({ mission, subject }: { mission: string; subject: string }) => {
  //fetch chat gpt api with gpt-4o-mini
  //Étape 1: getListSubtitle, créer une liste de sous-titres

  const listSubtitle = await getListSubtitle(subject);
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
        return createContentForIntro(subtitle, mission);
      } else if (subtitle.toLowerCase().includes('conclusion' || 'closure')) {
        return createContentForClosure(subtitle, mission);
      }
      const content = await createContentForSubtitle(subtitle, mission);
      return content;
    }),
  );
  //console.log('content: ', content);

  //Étape 3: Final draft, créer le contenu final en faisant des liens dans le contenu (plus tard: aussi en ajoutant des liens internes)
  const draft = listDraft.join('\n');
  const content = await improveDraft(draft, mission);
  console.log('content: ', content);
  return content;
  //const finalContent = createFinalContent(content); //TODO: Implementer cette fonction, retourne un article JSON, HTML ou plain text à voir
  // console.log('finalContent: ', finalContent);

  //Étape 4: Générer meta tags pour le contenu final

  //Étape x: Améliorer le contenu final de x façons différentes (ex: ajouter des images avec Stock Free Images or AI generated images)
  //Étape 5: Publier le contenu sur dans la base de donnée
};
