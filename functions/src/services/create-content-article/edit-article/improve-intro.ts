import { openai } from '../../../lib/open-ai';
import { improveIntroPrompt } from '../../../private/content';

// Function to improve the introduction of an article
export const improveIntro = async (
  draft: string,
  mission: string,
  subject: string,
  target_audience: string,
  lang: string,
): Promise<string> => {
  const prompt = await improveIntroPrompt(draft, mission, subject, target_audience, lang);

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: prompt.system,
      },
      {
        role: 'user',
        content: prompt.user,
      },
    ],
  });

  const content = completion.choices[0].message?.content;

  return content ?? 'No content generated';
};
