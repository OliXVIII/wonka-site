import { bucket } from '../../lib/firebase-admin';
import { openai } from '../../lib/open-ai';
import { createImagePrompt } from '../../private/image-prompt';

export const createImage = async (subject: string, clientId: string, id?: string): Promise<string | undefined> => {
  const prompt = createImagePrompt(subject);
  console.log('prompt: ', prompt);

  const picture = await openai.images.generate({
    model: 'dall-e-3',
    prompt: prompt,
    size: '1792x1024',
    quality: 'hd',
    n: 1,
  });

  const url = picture.data[0].url;

  if (!url) {
    return;
  }

  const publicUrl = saveImageStorage(url, clientId, id);

  return publicUrl ?? url;
};

const saveImageStorage = async (url: string, clientId: string, id?: string): Promise<string> => {
  const image = await fetch(url);
  const buffer = Buffer.from(await image.arrayBuffer());

  const file = bucket.file(`images/${clientId}/${id ?? ''}.png`);

  await file.save(buffer, {
    metadata: {
      contentType: 'image/png',
    },
  });

  await file.makePublic();

  return file.publicUrl();
};
