import { bucket } from '../../lib/firebase-admin';
import { openai } from '../../lib/open-ai';
import { createImagePrompt } from '../../private/image-prompt';

export const createImage = async (
  subject: string,
  clientId: string,
  id?: string,
  square?: boolean,
): Promise<string | undefined> => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: `Ìdentify 3 object or specific element to vizualize a subject for a blog titled "${subject}"  them in a singleshort phrase starting by "The image features a ..., a ... and a ...".`,
      },
    ],
  });

  const coreElements = completion.choices[0].message?.content;

  const prompt = createImagePrompt(subject, 'cartoonish', coreElements);
  console.log('prompt: ', prompt);

  const picture = await openai.images.generate({
    model: 'dall-e-3',
    prompt: prompt,
    size: square ? '1024x1024' : '1792x1024',
    quality: 'standard',
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
