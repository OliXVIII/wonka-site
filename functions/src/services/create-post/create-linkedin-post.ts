import { openai } from '../../lib/open-ai';
import { linkedinSecretPrompt } from '../../private/linkedin';
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
    const prompt = linkedinSecretPrompt(context, href, locale.language, info);

    const completion = await openai.chat.completions.create({
      model: 'o1-mini',
      messages: [
        {
          role: 'user',
          content: `${prompt.system}\n\n
          ${prompt.user}`,
        },
      ],
    });

    const response = completion.choices[0].message?.content?.replaceAll('```html', '').replaceAll('```', '');

    if (!response) {
      return null;
    }
    const cleanedResponse = response
      .replace(/```[\s\S]*?```/g, '')
      .replace(/^[^{[]*/, '')
      .replace(/[^}\]]*$/, '')
      .trim();

    try {
      const list = JSON.parse(cleanedResponse) as string[];

      return list;
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      return null;
    }
  } catch (error) {
    console.error('Error in generateLinkedinPost', error);
    return null;
  }
};
