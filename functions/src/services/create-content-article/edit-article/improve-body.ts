import { openai } from '../../../lib/open-ai';
import { improveBodyPrompt } from '../../../private/content';

// Function to improve the body of an article
export const improveBody = async (
  draft: string,
  mission: string,
  subject: string,
  target_audience: string,
  lang: string,
): Promise<string> => {
  const prompt = await improveBodyPrompt(draft, mission, subject, target_audience, lang);

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
