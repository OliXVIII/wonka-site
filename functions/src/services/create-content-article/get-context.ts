import { openai } from '../../lib/open-ai';
import { getContextPrompt } from '../../private/content';

// Function to improve the body of the article
export const getContext = async (context: string): Promise<string> => {
  const prompt = await getContextPrompt(context);

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
