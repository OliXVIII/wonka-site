import { openai } from '../../../lib/open-ai';
import { createGreatestTitleEverMadePrompt } from '../../../private/content';

// Function to generate a great SEO title
export const createGreatestTitleEverMade = async (
  subject: string,
  target_audience: string,
  mission: string,
  lang: string,
): Promise<string> => {
  const prompt = await createGreatestTitleEverMadePrompt(subject, target_audience, mission, lang);

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
    temperature: 0.01,
    top_p: 0.01,
  });

  const content = completion.choices[0].message?.content;

  return content ?? 'No content generated';
};
