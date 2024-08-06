import { createImage } from './create-image';

export const createNewImage = async (subject: string) => {
  const date = new Date();
  console.log(`Started creating image for "${subject}"`);
  const url = await createImage(subject);
  const picture = `<img src=${url} alt=${subject} width="400" height="225" />`;
  console.log('Finished creating image in ', new Date().getTime() - date.getTime(), 'ms');
  return { picture, url };
};
