export type ImageStyle = 'retro-style cartoonish' | 'cinematic' | 'cartoonish' | 'minimalistic';

export const createImagePrompt = ({
  subject,
  style,
  coreElements,
  region = 'Canada',
}: {
  subject: string;
  style?: ImageStyle;
  coreElements?: string | null;
  region?: string;
}): string => {
  if (
    !style ||
    (style !== 'retro-style cartoonish' && style !== 'cinematic' && style !== 'cartoonish' && style !== 'minimalistic')
  ) {
    style = 'retro-style cartoonish';
  }
  return `Create a thumbnail as a clean, professional and uncluttered ${style} image on the subject of "${subject}", requirements:\
 ${coreElements ?? 'The image features 3 main elements to picturize the subject'}.\
 The color palette is fresh and natural, using soft colors.\
 Minimal design ensuring the image remains clean and uncluttered.\
 Minimal and visually engaging design, with an emphasis on simplicity and clarity.\
 Avoid showing people, even in silhouette, try to use objects instead.\
 Without any big text, letters, or symbols resembling big text text or letters.\
 This image ratio is 16:9.`;
};
