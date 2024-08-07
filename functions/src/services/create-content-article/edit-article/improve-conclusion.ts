import { openai } from '../../../lib/open-ai';
import { improveConclusionPrompt } from '../../../private/content';

// Function to improve the conclusion of an article
export const improveConclusion = async (
  draft: string,
  mission: string,
  subject: string,
  target_audience: string,
  lang: string,
): Promise<string> => {
  const prompt = await improveConclusionPrompt(draft, mission, subject, target_audience, lang);

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
