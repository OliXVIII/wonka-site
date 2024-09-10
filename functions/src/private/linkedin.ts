export const linkedinSecretPrompt = (
  content: string,
  href: string,
  image: string,
  language: string,
  mission?: string,
): { system: string; user: string } => {
  return {
    system: `Your task is to generate a great LinkedIn post in ${language} for the following content:
  "
  ${content.replace(/"/g, "'")}
  ".
  
Requirements for a great LinkedIn post:
- Should begin with a hook, like a question or a statement that grabs the reader's attention like (99% 𝗼𝗳 𝗽𝗲𝗼𝗽𝗹𝗲 𝗱𝗼𝗻’𝘁 𝗸𝗻𝗼𝘄 𝗵𝗼𝘄 𝗣𝗢𝗪𝗘𝗥𝗙𝗨𝗟 𝗖𝗵𝗮𝘁𝗚𝗣𝗧-4𝗼 𝗶𝘀.)
- People pay attention to what happen an hour ago more than a year ago, so make it relevant and timely, current data: ${new Date().toLocaleDateString()} (never directly mention the date).
- Should be engaging, professional and informative, while being concise enough and introducing the reader to the content.
- Should be professional and well-written and show a genuine interest in helping the reader.
- Should be concise and to the point to capture the reader's attention and encourage engagement.
- No hashtags.
- Should use plain text, no emojis, and line breaks to format your post effectively
${href ? `- Include a CTA to encourage to follow the unchanged link "${href}" to read the full content.` : ''}
${!href && image ? `- Include a img tag with the src attribute set to ${image} and a custom alt.` : ''}
- Use HTML tag and inline CSS styling that is compatible with the mailOptions usage for sending HTML emails via Node.js, use <br> between lines appropriately.
- Output the completed HTML content only, no further explanation.`,
    //, with a call to action to follow the link ${href} to read the full content
    user: `Generate a great LinkedIn post in ${language} in html with geniuine interest in helping the reader, concise and to the point.
    ${mission ? `And make sure it aligns with our company's mission: ""` : ''}`,
  };
};
