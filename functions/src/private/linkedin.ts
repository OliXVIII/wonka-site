import { ClientInfo } from '../types/client-info';

export const linkedinSecretPrompt = (
  context: string,
  href: string,
  language: string,
  info: ClientInfo,
): { system: string; user: string } => {
  const { mission, CTA } = info;
  return {
    system: `Your task is to generate an interesting LinkedIn posts in ${language} related to the following context:
  """
  ${context.replace(/"/g, "'")}
  """.
  
  
Requirements for all LinkedIn post:
- Should begin with a hook, like a statement or a question that grabs the reader's attentio, ex: (99% 𝗼𝗳 𝗽𝗲𝗼𝗽𝗹𝗲 𝗱𝗼𝗻’𝘁 𝗸𝗻𝗼𝘄 𝗵𝗼𝘄 𝗣𝗢𝗪𝗘𝗥𝗙𝗨𝗟 𝗖𝗵𝗮𝘁𝗚𝗣𝗧-4𝗼 𝗶𝘀.).
- People pay attention to what happen an hour ago more than a year ago, so make it relevant and timely, current data: ${new Date().toLocaleDateString()} (never directly mention the date).
- Should be engaging, professional and informative, while being concise enough and introducing the reader to the content.
- Should be professional and well-written and show a genuine interest in helping the reader.
- Should be concise and to the point to capture the reader's attention and encourage engagement.
- No hashtags.
- Should use plain text, and line breaks to space out your post effectively.
${href && CTA ? `- Include a CTA to encourage to "${CTA}".` : "- JUST try to provide value and engaging content to the user from the context, don't ask for anything and don't include a CTA."}
- Use HTML tag and without CSS styling that is compatible with the mailOptions usage for sending HTML emails via Node.js, use <br> between lines appropriately.
- Output the completed HTML content only, no further explanation.

Requirements for first post:
- No emojis.
- Should be more informative and professional.
- Should be longer than the other posts, but still concise (range of 1,300 to 2,000 characters).
- Purpose is to teach, inform and share knowledge in a professional but human way.

Requirements for second post:
- No emojis.
- Should be shorter than the other posts.

Requirements for third post:
- Can use emojis naturally, that means put emojis after the punctuation in a sentence and organize in a logical order, so that they make sense and enhance your communication.
- Should be more engaging and human-like, with possible humor or personal touch.
- To add to that personnal touch, close with our mission in mind: "${mission}" without mentioning it directly, but underlining the importance of the mission in the context of the post.
`,
    //, with a call to action to follow the link ${href} to read the full content
    user: `Now generate 3 great LinkedIn posts in ${language} in html with geniuine interest in helping the reader learn more.
    Please provide the list as a JSON array with a string for each post without any additional text or formatting, like: ["post 1", "post 2", "post 3"]`,
  };
};
