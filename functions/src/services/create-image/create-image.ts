import { openai } from '../../lib/open-ai';
import { createImagePrompt } from '../../private/image-prompt';

export const createImage = async (subject: string): Promise<string> => {
  const prompt = await createImagePrompt(subject);

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
