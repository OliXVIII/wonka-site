import { openai } from '../../lib/open-ai';
import { createDatasetContextPrompt } from '../../private/content';

// Function to generate a prompt to create a dataset
export const createDatasetContext = async (context: string, target_audience: string, mission: string): Promise<string> => {
  const prompt = await createDatasetContextPrompt(context, target_audience, mission);

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
