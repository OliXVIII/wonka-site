import { openai } from '../../lib/open-ai';
import { editDatasetPrompt } from '../../private/chart';
import { LocaleDetails } from '../../types/languages';

// Function to edit the dataset to improve it
export const editChartDataset = async (dataset: string, article: string, lang: LocaleDetails) => {
  const prompt = await editDatasetPrompt(dataset, article, lang);

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
    response_format: { type: 'json_object' },
  });

  const content = completion.choices[0].message?.content;

  return content ?? 'No content generated';
};
