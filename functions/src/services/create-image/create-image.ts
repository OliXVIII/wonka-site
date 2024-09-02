import { bucket } from '../../lib/firebase-admin';
import { openai } from '../../lib/open-ai';
import { createImagePrompt } from '../../private/image-prompt';
import { ClientInfo } from '../../types/client-info';
import { v4 as uuidv4 } from 'uuid';

export const createImage = async ({
  subject,
  clientId,
  clientInfo,
  id,
}: {
  subject: string;
  clientId: string;
  clientInfo?: ClientInfo;
  id?: string;
}): Promise<string | undefined> => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: `Ìdentify 3 main vizuale elements to vizualize "${subject}" in a simple thumbnail, output them in a singleshort phrase like "The image features 3 core elements: element_1, element_2 and element_3".${
          clientInfo?.image_style ? ` These element should be perfect to represent in a ${clientInfo?.image_style} style.}` : ''
        } with no textual elements.`,
      },
    ],
  });

  const coreElements = completion.choices[0].message?.content;

  const prompt = createImagePrompt({ subject, style: clientInfo?.image_style, coreElements });

  const picture = await openai.images.generate({
    model: 'dall-e-3',
    prompt: prompt,
    size: '1792x1024',
    quality: 'standard',
    n: 1,
  });

  const url = picture.data[0].url;

  if (!url) {
    return;
  }

  const publicUrl = saveImageStorage(url, clientId, subject);

  return publicUrl ?? url;
};

const saveImageStorage = async (url: string, clientId: string, subject: string): Promise<string> => {
  const image = await fetch(url);
  const buffer = Buffer.from(await image.arrayBuffer());

  const id = subject.replace(/ /g, '-').toLowerCase();

  const uniqueSuffix = uuidv4();
  let filePath = `images/${clientId}/${id ?? 'new'}-${uniqueSuffix}.png`;

  const file = bucket.file(filePath);

  // Save the file with the buffer and metadata
  await file.save(buffer, {
    metadata: {
      contentType: 'image/png',
    },
  });

  await file.makePublic();

  return file.publicUrl();
};
