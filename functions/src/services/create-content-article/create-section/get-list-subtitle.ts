import { openai } from '../../../lib/open-ai';
import { getListOfSubjectSecretPrompt } from '../../../private/content';
import { preprocessJSON } from '../../preprocessJSON';

export const getListSubtitle = async (
  context: string,
  target_audience: string,
  mission: string,
  seoTitle: string,
  language: string,
): Promise<string[]> => {
  const prompt = await getListOfSubjectSecretPrompt(context, target_audience, mission, seoTitle, language);

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini', //TODO: Tester différente version de gpt
    // response_format: { type: 'json_object' },
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

  const result = preprocessJSON(completion.choices[0].message?.content ?? '');

  if (!result) {
    return [];
  }
  try {
    JSON.parse(result);
  } catch (error) {
    console.log('Error parse in get-list-subcategories.ts: ', error);
    return [];
  }
  const data: string[] = JSON.parse(result);

  return data;
};
