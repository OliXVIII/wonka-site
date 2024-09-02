import { openai } from '../../../lib/open-ai';
import { createGreatestTitleEverMadePrompt } from '../../../private/content';

// Function to generate a great SEO title
export const createGreatestTitleEverMade = async (
  prompt: string,
  target_audience: string,
  mission: string,
  lang: string,
): Promise<string> => {
  const prompts = await createGreatestTitleEverMadePrompt({ prompt, target_audience, mission, lang });

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
  });

  const content = completion.choices[0].message?.content;

  return content ?? 'No content generated';
};
