import { openai } from '../../lib/open-ai';
import { createDatasetPrompt } from '../../private/chart';
import { LocaleDetails } from '../../types/languages';

// Function to generate a dataset to a given prompt (named context)
export const createChartDataset = async (context: string, locale: LocaleDetails, type?: 'bar' | 'pie') => {
  const prompt = await createDatasetPrompt(context, locale, type);

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
