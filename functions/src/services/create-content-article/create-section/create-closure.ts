import { openai } from '../../../lib/open-ai';
import { getConclusionPrompt } from '../../../private/content';

// Function to generate content for a subtitle
export const createContentForClosure = async (
  subtitle: string,
  mission: string,
  subject: string,
  target_audience: string,
  listSubtitle: string[],
): Promise<string> => {
  const prompt = await getConclusionPrompt(subtitle, mission, subject, target_audience, listSubtitle);

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
    temperature: 0.000001,
    top_p: 0.000001,
  });

  const content = completion.choices[0].message?.content;

  return content ?? 'No content generated';
};
