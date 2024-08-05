import { openai } from '../../lib/open-ai';
import { seoTitlePrompt } from '../../private/prompt';

// Function to generate nice and clean seo title
export const seoTitle = async (title: string): Promise<string> => {
  const prompt = await seoTitlePrompt(title);

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
