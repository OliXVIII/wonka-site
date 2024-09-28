import { ClientInfo } from '../types/client-info';

export const linkedinSecretPrompt_v1 = (
  context: string,
  href: string,
  language: string,
  info: ClientInfo,
): { system: string; user: string } => {
  const { mission, CTA } = info;
  return {
    system: `Your task is to generate an interesting LinkedIn post in ${language} related to the following context:
  """
  ${context.replace(/"/g, "'")}
  """.

  We wan't 3 different posts in a JSON list for the same content, each with a different angle, and each with a different hook to grab the reader's attention like:
  ["HTML Post 1", "HTLM Post 2", "HTML Post 3"].
  
  
Requirements for a great LinkedIn post:
- Should begin with a hook, like a statement or a question that grabs the reader's attentio, ex: (99% 𝗼𝗳 𝗽𝗲𝗼𝗽𝗹𝗲 𝗱𝗼𝗻’𝘁 𝗸𝗻𝗼𝘄 𝗵𝗼𝘄 𝗣𝗢𝗪𝗘𝗥𝗙𝗨𝗟 𝗖𝗵𝗮𝘁𝗚𝗣𝗧-4𝗼 𝗶𝘀.).
- People pay attention to what happen an hour ago more than a year ago, so make it relevant and timely, current data: ${new Date().toLocaleDateString()} (never directly mention the date).
- Should be engaging, professional and informative, while being concise enough and introducing the reader to the content.
- Should be professional and well-written and show a genuine interest in helping the reader.
- Should be concise and to the point to capture the reader's attention and encourage engagement.
${mission ? `- Make sure it aligns with our mission: "${mission}" without mentioning it directly.` : ''}
- No hashtags.
- No emojis for post 1 and 2, but you can use a few emojis for post 3.
- Post 2 should be shorter and prone to be more engaging.
- Should use plain text, and line breaks to space out your post effectively.
${href && CTA ? `- Include a CTA to encourage to "${CTA}".` : "- JUST try to provide value and engaging content to the user from the context, don't ask for anything and don't include a CTA."}
- Use HTML tag and without CSS styling that is compatible with the mailOptions usage for sending HTML emails via Node.js, use <br> between lines appropriately.
- Output the completed HTML content only, no further explanation.`,
    //, with a call to action to follow the link ${href} to read the full content
    user: `Generate a great LinkedIn post in ${language} in html with geniuine interest in helping the reader learn more, while being concise and to the point.
    Return a list of string separated by comma and nothing else.`,
  };
};

// v2.0
export const linkedinSecretPrompt_v2 = (
  content: string,
  href: string,
  image: string,
  language: string,
  info: ClientInfo,
): { system: string; user: string } => {
  const { CTA } = info;
  return {
    system: `Your task is to generate a great LinkedIn post in ${language} for the following content:
${content}
  
Requirements for a great LinkedIn post:
- Should begin with a hook, like a statement or a question that grabs the reader's attentio, ex: (99% 𝗼𝗳 𝗽𝗲𝗼𝗽𝗹𝗲 𝗱𝗼𝗻’𝘁 𝗸𝗻𝗼𝘄 𝗵𝗼𝘄 𝗣𝗢𝗪𝗘𝗥𝗙𝗨𝗟 𝗖𝗵𝗮𝘁𝗚𝗣𝗧-4𝗼 𝗶𝘀.).
- People pay attention to what happen an hour ago more than a year ago, so make it relevant and timely to current data if possible: ${new Date().toLocaleDateString()} (never directly mention the date directly).
- Should be engaging, well-written and informative, while being concise enough and introducing the reader to the content.
- Should be well-written and show a genuine interest in helping the reader.
- Should be concise and to the point to capture the reader's attention and encourage engagement.
- No hashtags.
- Should use plain text, no emojis, and line breaks to format your post effectively
${href && !CTA ? `- Include a CTA to encourage to follow the unchanged link "${href}" to read the full content.` : ''}
${CTA ? `- Include a CTA for ${CTA}, but don't ask for anything, it shouldn't reprensent more than 10% of the content` : ''}
${!href && image ? `- Include a img tag with the src attribute set to ${image} and a custom alt.` : ''}
- Use HTML tag and inline CSS styling that is compatible with the mailOptions usage for sending HTML emails via Node.js, use <br> between lines appropriately.
- Output the completed HTML content only, no further explanation.`,
    //, with a call to action to follow the link ${href} to read the full content
    user: `Generate a great LinkedIn post in ${language} in html with geniuine interest in helping the reader, while being concise and to the point.`,
  };
};
