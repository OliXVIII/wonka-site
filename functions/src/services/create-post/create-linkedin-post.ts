import { openai } from '../../lib/open-ai';
import { linkedinSecretPrompt_v1 } from '../../private/linkedin';
import { ClientInfo } from '../../types/client-info';
import { LocaleDetails } from '../../types/languages';

export const generateLinkedinPost = async ({
  context,
  href,
  locale,
  info,
}: {
  context: string;
  href: string;
  locale: LocaleDetails;
  info: ClientInfo;
}): Promise<string[] | null> => {
  try {
    const prompt = linkedinSecretPrompt_v1(context, href, locale.language, info);

    console.log('Prompt:', JSON.stringify(prompt));

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

    const response = completion.choices[0].message?.content?.replaceAll('```html', '').replaceAll('```', '');

    if (!response) {
      return null;
    }

    const list = JSON.parse(response) as string[];

    return list;
  } catch (error) {
    console.error('Error in generateLinkedinPost', error);
    return null;
  }
};
