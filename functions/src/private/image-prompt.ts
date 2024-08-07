type ImageStyle =
  | 'cartoonish'
  | 'cinematic'
  | 'approachable'
  | 'retro'
  | 'minimal'
  | 'clean'
  | 'uncluttered'
  | 'engaging'
  | 'simple';

export const createImagePrompt = (subject: string, style: ImageStyle = 'cartoonish', coreElements?: string | null): string => {
  console.log('subject: ', coreElements);
  return `Create a clean and uncluttered retro-style ${style} image representing the core subject of ${subject}.\
 ${coreElements ?? 'The image features 2-3 core elements to picturize the subject.'}\
 The color palette is fresh and natural, using soft colors.\
 Minimal design ensuring the image remains clean and uncluttered.\
 Overall vibe is neat, approachable, and visually engaging, with an emphasis on simplicity and clarity.\
 Focus on specific, visually representable elements.\
 Describe actions and scenarios rather than abstract concepts.\
 Avoid ambiguous language that could be interpreted as including text.`;
};
