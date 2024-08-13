import { openai } from '../../lib/open-ai';
import { linkedinSecretPrompt } from '../../private/linkedin';

export const generateLinkedinPost = async (content: string, image: string, href: string): Promise<string | null> => {
  try {
    const prompt = linkedinSecretPrompt(content, image, href);

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

    const response = completion.choices[0].message?.content;
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
