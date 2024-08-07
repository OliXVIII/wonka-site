export const linkedinSecretPrompt = (content: string, image: string): { system: string; user: string } => {
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
- The post should be formatted correctly for LinkedIn, with proper spacing and formatting.
- Include a call to action to encourage to follow the link to the content.
- The post should include the thumbnail image "${image}" to attract the reader's attention in a image tag.
`,
    user: `Generate a LinkedIn post`,
  };
};
