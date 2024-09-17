import { openai } from '../../lib/open-ai';
import { getNextArticleIdeasPrompt } from '../../private/ideas';
import { preprocessJSON } from '../preprocessJSON';

// Function to improve the body of the article
export const getNextArticleIdeas = async (ideas: string[], mission: string, targetAudience: string): Promise<string[]> => {
  const prompt = await getNextArticleIdeasPrompt(ideas, mission, targetAudience);

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

  const result = preprocessJSON(completion.choices[0].message?.content ?? '');

  if (!result) {
    console.log('Error in get-10-root-ideas.ts: no result');
    return [];
  }
  try {
    const data: string[] = JSON.parse(result);
    return data;
  } catch (error) {
    console.log('Error parse in get-10-root-ideas.ts: ', error);
    return [];
  }
};
