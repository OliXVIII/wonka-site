export const linkedinSecretPrompt = (content: string, image: string, href: string): { system: string; user: string } => {
  //TODO - Provide a link to the content

  return {
    system: `Generate a LinkedIn post with the following content:
  "${content.replace(/"/g, "'")}"
  
Requirements:
- The post should be engaging and informative, while being concise enough and introducing the reader to the content.
- The post should be professional and well-written.
- The post should be tailored to a professional audience.
- The post should be concise and to the point to capture the reader's attention and encourage engagement.
- The post should include relevant hashtags and mentions to increase visibility.
- The post should use plain text, emojis, and line breaks to format your post effectively
- Include a call to action to encourage to follow the link ${href} to read the full content.
- The post will be sent by email, it should be copy-paste ready for linkedin, with no need for further editing.`,
    user: `Generate a LinkedIn post`,
  };
};
