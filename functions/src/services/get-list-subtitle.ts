import { openai } from '../lib/open-ai';
import { getListOfSubjectSecretPrompt } from '../private/prompt';

export const getListSubtitle = async (subject: string): Promise<string[]> => {
  const prompt = await getListOfSubjectSecretPrompt(subject);

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini', //TODO: Tester différente version de gpt
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

  const result = completion.choices[0].message?.content
    ?.replaceAll('\n', '')
    .replaceAll('json', '')
    .replaceAll('```', '')
    .replaceAll('javascript', '');

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
