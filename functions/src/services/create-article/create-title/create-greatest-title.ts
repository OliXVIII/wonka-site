import { openai } from '../../../lib/open-ai';
import { createGreatestTitleEverMadePrompt } from '../../../private/content';

// Function to generate a great SEO title
export const createGreatestTitleEverMade = async (
  prompt: string,
  target_audience: string,
  mission: string,
  lang: string,
  retry: boolean = false,
): Promise<{
  title: string;
  id: string;
}> => {
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
    response_format: { type: 'json_object' },
  });

  const content = completion.choices[0].message?.content;

  if (!content) {
    if (retry) {
      throw new Error('Failed to generate a title and id');
    }
    return createGreatestTitleEverMade(prompt, target_audience, mission, lang, true);
  }

  const data = JSON.parse(content) as { title: string; id: string };

  return data;
};
