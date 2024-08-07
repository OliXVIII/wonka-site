import { openai } from '../../lib/open-ai';
import { linkedinSecretPrompt } from '../../private/linkedin';

// Function to generate content for a subtitle
export const createContentForClosure = async (content: string, image: string): Promise<string | null> => {
  try {
    const prompt = linkedinSecretPrompt(content, image);

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

    return response;
  } catch (error) {
    console.error('Error in createContentForClosure', error);
    return null;
  }
};
