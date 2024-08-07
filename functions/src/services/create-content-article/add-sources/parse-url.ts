import { openai } from '../../../lib/open-ai';
import { parseUrlPrompt } from '../../../private/add-sources';
// Function to parse content to json format
export const createContentForClosure = async (sources: string): Promise<string> => {
  const prompt = await parseUrlPrompt(sources);

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
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

  return content ?? 'No url parsed';
};
