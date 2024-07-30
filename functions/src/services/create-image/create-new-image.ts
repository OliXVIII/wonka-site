import { createImageForContent } from './create-image';

export const createNewImage = async ({ mission, subject, image }: { mission: string; subject: string; image: string }) => {
  const url = await createImageForContent(mission, subject, image);
  const picture = `<img src=${url} alt=${subject} width="500" height="500" />`;
  return { picture, url };
};
