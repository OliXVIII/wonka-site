import { openai } from '../../../lib/open-ai';
import { getBodyPrompt } from '../../../private/content';

// Function to generate content for a subtitle
export const createBody = async (
  subtitle: string,
  mission: string,
  subject: string,
  targetAudience: string,
  listOfSubtitles: string[],
): Promise<string> => {
  const prompt = await getBodyPrompt(subtitle, mission, subject, targetAudience, listOfSubtitles);

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
