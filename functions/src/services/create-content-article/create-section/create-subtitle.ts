import { openai } from '../../../lib/open-ai';
import { getContentForSubtitlePrompt } from '../../../private/prompt';

// Function to generate content for a subtitle
export const createContentForSubtitle = async (
  subtitle: string,
  mission: string,
  subject: string,
  target_audience: string,
): Promise<string> => {
  const prompt = await getContentForSubtitlePrompt(subtitle, mission, subject, target_audience);

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
