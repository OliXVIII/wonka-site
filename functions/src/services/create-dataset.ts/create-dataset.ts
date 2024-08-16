import { openai } from '../../lib/open-ai';
import { createDatasetPrompt } from '../../private/content';

// Function to generate a dataset to a given prompt (named context)
export const createDataset = async (context: string, target_audience: string, mission: string, lang: string): Promise<string> => {
  const prompt = await createDatasetPrompt(context, target_audience, mission, lang);

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
    temperature: 0.1,
    top_p: 0.1,
  });

  const content = completion.choices[0].message?.content;

  return content ?? 'No content generated';
};
