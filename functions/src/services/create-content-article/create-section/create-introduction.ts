import { openai } from '../../../lib/open-ai';
import { getContentForIntroPrompt } from '../../../private/prompt';

// Function to generate content for a subtitle
export const createContentForIntro = async (
  subtitle: string,
  mission: string,
  subject: string,
  target_audiance: string,
  listSubtitle: string[],
): Promise<string> => {
  const prompt = await getContentForIntroPrompt(subtitle, mission, subject, target_audiance, listSubtitle);

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
