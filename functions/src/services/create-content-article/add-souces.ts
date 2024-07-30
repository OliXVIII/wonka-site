import { openai } from '../../lib/open-ai';
import { addSourcesPrompt, addSourcesToItemPrompt, findSourcesItemPrompt } from '../../private/prompt';

// Function to add sources to a text
export const addSources = async (source: string, mission: string, subject: string): Promise<string> => {
  let prompt = await findSourcesItemPrompt(source, mission, subject);

  const listKeyElementPrompt = await openai.chat.completions.create({
    model: 'gpt-4o',
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

  const listKeyElement = listKeyElementPrompt.choices[0].message?.content;
  console.log('listKeyElement: ', listKeyElement);
  prompt = await addSourcesToItemPrompt(listKeyElement ?? 'error in listKeyElement', subject);

  const listOfSourcesPrompt = await openai.chat.completions.create({
    model: 'gpt-4o',
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

  const listOfSources = listOfSourcesPrompt.choices[0].message?.content;
  console.log('listOfSources: ', listOfSources);

  prompt = await addSourcesPrompt(source, listOfSources ?? 'error in listOfSources');

  const articleWithSourcesPrompt = await openai.chat.completions.create({
    model: 'gpt-4o',
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

  const ArticleWithSources = articleWithSourcesPrompt.choices[0].message?.content;

  return ArticleWithSources ?? 'No content generated';
};
