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
  return `Create a clean , simple and uncluttered ${style} image representing the core subject of ${subject}, requirements:\
 ${coreElements ?? 'The image features 3 main elements to picturize the subject'}.\
 The color palette is fresh and natural, using soft colors.\
 Minimal design ensuring the image remains clean and uncluttered.\
 Minimal and visually engaging design, with an emphasis on simplicity and clarity.\
 No text, or any ambiguous language that could be interpreted as including text.\
 Describe actions and scenarios rather than abstract concepts.
 In the socio-cultural context of ${region} to make it relatable, skin tones and cultural references should be appropriate.`;
};
