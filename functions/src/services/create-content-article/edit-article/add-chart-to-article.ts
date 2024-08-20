import { openai } from '../../../lib/open-ai';
import { addChartToArticlePrompt } from '../../../private/chart';

// Function to add <div id=”chart”></div> in the article content
export const addChartToArticle = async (content: string, dataset: string): Promise<string> => {
  const prompt = await addChartToArticlePrompt(content, dataset);

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

  const data = completion.choices[0].message?.content;

  return data ?? 'No content generated';
};
