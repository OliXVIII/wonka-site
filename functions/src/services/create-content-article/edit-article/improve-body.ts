import { openai } from '../../../lib/open-ai';
import { improveBodyPrompt } from '../../../private/content';

// Function to generate content for a subtitle
export const improveBody = async (body: string, lang: string, listSubtitle: string[]): Promise<string> => {
  const prompt = await improveBodyPrompt(body, lang, listSubtitle);

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
