import { openai } from '../../../lib/open-ai';
import { editContentPrompt } from '../../../private/content';

// Function to edit the content of an article and format it
export const editContent = async (
  article: string,
  lang: string,
  subtitleList: string[],
  greatestTitle: string,
  context: string,
): Promise<string> => {
  const prompt = await editContentPrompt(article, lang, subtitleList, greatestTitle, context);

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
