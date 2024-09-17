import { openai } from '../../lib/open-ai';
import { twitterSecretPrompt } from '../../private/twitter';
import { LocaleDetails } from '../../types/languages';

export const generateTwitterPost = async (content: string, href: string, locale: LocaleDetails): Promise<string | null> => {
  try {
    // Generate the prompt using a custom Twitter-specific template
    const prompt = twitterSecretPrompt(content, href, locale.language);

    // Make the OpenAI API call to generate the Twitter post
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

    // Extract the response and clean up any unwanted formatting
    const response = completion.choices[0].message?.content?.replaceAll('```html', '').replaceAll('```', '');
    console.log('Response from generateTwitterPost', response);

    if (!response) {
      return null;
    }

    return response;
  } catch (error) {
    console.error('Error in generateTwitterPost', error);
    return null;
  }
};
