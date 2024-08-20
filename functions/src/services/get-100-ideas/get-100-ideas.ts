import { LocaleDetails } from '../../types/languages';
import { get10IdeasFromIdea } from './get-10-ideas-from-idea';
import { get10RootIdeas } from './get-10-root-ideas';

export const get100Ideas = async (
  subject: string,
  locale: LocaleDetails,
  mission: string,
  target_audience: string,
): Promise<string[]> => {
  const rootIdeas = await get10RootIdeas(subject, locale, mission, target_audience);
  const ideas = await Promise.all(
    rootIdeas.map(async (idea: string) => {
      const ideas = await get10IdeasFromIdea(idea, locale, mission, target_audience);

      return ideas;
    }),
  );

  return ideas.flat();
};
