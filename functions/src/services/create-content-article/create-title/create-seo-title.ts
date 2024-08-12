import { openai } from '../../../lib/open-ai';
import { createSEOTitlePrompt } from '../../../private/content';

// Function to generate a great SEO title
export const createSEOTitle = async (
  subject: string,
  target_audience: string,
  mission: string,
  lang: string,
): Promise<string> => {
  const prompt = await createSEOTitlePrompt(subject, target_audience, mission, lang);

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
