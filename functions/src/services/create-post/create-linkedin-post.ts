import { openai } from '../../lib/open-ai';
import { linkedinSecretPrompt } from '../../private/linkedin';
import { LocaleDetails } from '../../types/languages';

export const generateLinkedinPost = async (
  content: string,
  image: string,
  href: string,
  locale: LocaleDetails,
): Promise<string | null> => {
  try {
    const prompt = linkedinSecretPrompt(content, href, image, locale.language);

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
