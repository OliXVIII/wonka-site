export const createImagePrompt = async (subject: string): Promise<string> => {
  return `Generate a perfect thumbnail image for this blog subject:
“${subject}”

Requirement:
- No text, no writing, only visual support.
- The thumbnail image has a modern, simple, and playful feel , is not overloaded with element, using a palette of inviting colors that give it a fresh and modern look. The simplified, cartoon-like depiction of its subject adds a sense of accessibility, making the concept feel more approachable and fun. The overall composition is neat and well-organized, suggesting clarity and ease of understanding.
- aspect ratio of 16/9 video, use all the space without overloading the content.`;
};
