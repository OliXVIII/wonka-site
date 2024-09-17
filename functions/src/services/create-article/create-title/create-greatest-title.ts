import { openai } from '../../../lib/open-ai';
import { createGreatestTitleEverMadePrompt } from '../../../private/content';

// Function to generate a great SEO title
export const createGreatestTitleEverMade = async (
  prompt: string,
  targetAudience: string,
  mission: string,
  lang: string,
): Promise<string> => {
  const prompts = await createGreatestTitleEverMadePrompt({ prompt, targetAudience, mission, lang });

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
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
