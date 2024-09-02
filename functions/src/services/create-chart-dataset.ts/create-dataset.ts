import { openai } from '../../lib/open-ai';
import { createDatasetPrompt } from '../../private/chart';
import { LocaleDetails } from '../../types/languages';

// Function to generate a dataset to a given prompt (named context)
export const createChartDataset = async (prompt: string, locale: LocaleDetails, type?: 'bar' | 'pie') => {
  const prompts = await createDatasetPrompt(prompt, locale, type);

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: prompts.system,
      },
      {
        role: 'user',
        content: prompts.user,
      },
    ],
    response_format: { type: 'json_object' },
  });

  const content = completion.choices[0].message?.content;

  return content ?? 'No content generated';
};
