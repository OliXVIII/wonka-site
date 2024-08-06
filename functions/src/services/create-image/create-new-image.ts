import { createImage } from './create-image';

export const createNewImage = async (
  subject: string,
  clientId: string,
  id?: string,
): Promise<{ picture: string; url: string }> => {
  const date = new Date();
  console.log(`Started creating image for "${subject}"`);
  const url = await createImage(subject, clientId, id);

  if (!url) {
    console.error('Failed to create image');
    return { picture: '', url: '' };
  }

  const picture = `<img src=${url} alt=${subject} width="400" height="225" />`;

  console.log('Finished creating image in ', new Date().getTime() - date.getTime(), 'ms');
  return { picture, url };
};
