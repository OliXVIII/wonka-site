import { openai } from '../../lib/open-ai';
import { linkedinSecretPrompt_v1 } from '../../private/linkedin';
import { ClientInfo } from '../../types/client-info';
import { LocaleDetails } from '../../types/languages';

export const generateLinkedinPost = async ({
  content,
  image,
  href,
  locale,
  info,
}: {
  content: string;
  image: string;
  href: string;
  locale: LocaleDetails;
  info: ClientInfo;
}): Promise<string | null> => {
  try {
    const prompt = linkedinSecretPrompt_v1(content, href, image, locale.language, info);

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
    console.log('Response from generateLinkedinPost', response);

    if (!response) {
      return null;
    }

    return response;
  } catch (error) {
    console.error('Error in generateLinkedinPost', error);
    return null;
  }
};
