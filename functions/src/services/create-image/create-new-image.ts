import { createImageForContent } from './create-image';

export const createNewImage = async (mission: string, subject: string, image: string, target_audience: string) => {
  const url = await createImageForContent(mission, subject, image, target_audience);
  const picture = `<img src=${url} alt=${subject} width="500" height="500" />`;
  return { picture, url };
};
