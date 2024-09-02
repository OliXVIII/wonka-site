export const linkedinSecretPrompt = (
  content: string,
  href: string,
  image: string,
  mission?: string,
): { system: string; user: string } => {
  return {
    system: `Your task is to generate a LinkedIn post for the following content:
  "${content.replace(/"/g, "'")}"
  
Requirements:
- The post should be engaging, professional and informative, while being concise enough and introducing the reader to the content.
- The post should be professional and well-written and show a genuine interest in helping the reader.
- The post should be concise and to the point to capture the reader's attention and encourage engagement.
- The post should include relevant hashtags and mentions to increase visibility.
- The post should use plain text, no emojis, and line breaks to format your post effectively
- Include a call to action to encourage to follow the full link "${href}" to read the full content.
- Use HTML tag and inline CSS styling that is compatible with the mailOptions usage for sending HTML emails via Node.js, use <br> between lines appropriately.
- Include a img tag with the src attribute set to ${image} and a custom alt.
- Output the completed HTML content only, no further explanation.`,
    user: `Generate a great LinkedIn post in html with geniuine interest in helping the reader, concise and to the point, with a call to action to follow the link ${href} to read the full content.
    ${mission ? `And make sure it aligns with our company's mission: ""` : ''}`,
  };
};
