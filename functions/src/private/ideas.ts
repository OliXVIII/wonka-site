import { LocaleDetails } from '../types/languages';

export const get10RootIdeasPrompt = async (
  subject: string,
  locale: LocaleDetails,
  mission: string,
  target_audience: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive a context consisting of a subject, a mission, and a target audience.
    You will also receive a language.

    -You will generate 10 ideas related to the subject, mission, and target audience.
    -This should be a list of subjects that can be further developed into articles.
    -The ideas should be unique and interesting.
    -The ideas should be in the language provided.
    -You will return an array of 10 ideas.
      `,
    user: `Here's the subject: ${subject}, the mission: ${mission}, the target audience: ${target_audience}, and the language: ${locale.language}`,
  };
};

export const get10IdeasFromIdeaPrompt = async (
  idea: string,
  locale: LocaleDetails,
  mission: string,
  target_audience: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive a context consisting of a idea, a mission, and a target audience.
      You will also receive a language.
  
      -You will generate 10 new ideas related to the specific idea, mission, and target audience.
      -This should be a list of subjects that can be further developed into articles.
      -The ideas should be unique and interesting.
      -The ideas should be in the language provided.
      -You will return an array of 10 ideas.
        `,
    user: `Here's the idea: ${idea}, the mission: ${mission}, the target audience: ${target_audience}, and the language: ${locale.language}`,
  };
};
