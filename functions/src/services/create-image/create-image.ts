import { openai } from '../../lib/open-ai';
import { createImagePrompt } from '../../private/prompt';

// Function to generate content for a subtitle
export const createImageForContent = async (
  mission: string,
  subject: string,
  image: string,
  target_audiance: string,
): Promise<string> => {
  const prompt = await createImagePrompt(mission, subject, image, target_audiance);

  const picture = await openai.images.generate({
    model: 'dall-e-3',
    prompt: prompt,
    size: '1024x1024',
    quality: 'standard',
    n: 1,
  });

  const url = picture.data[0].url;

  return url ?? 'No image generated';
};
