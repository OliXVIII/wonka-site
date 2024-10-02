import { ClientInfo } from '../types/client-info';

//TODO: make it personnal, "this is what WE learned..."
export const linkedinSecretPrompt = (
  context: string,
  href: string,
  language: string,
  info: ClientInfo,
): { system: string; user: string } => {
  const { mission, CTA } = info;
  const region = info.region || 'Quebec, Canada';

  return {
    system: `Your task is to generate an interesting LinkedIn posts in ${language} related to the following context:
  """
  ${context.replace(/"/g, "'")}
  """.
  
  
Requirements for all LinkedIn post:
- Should begin with a hook, like a big statement or a question that grabs the reader's attention, ex: (99% 𝗼𝗳 𝗽𝗲𝗼𝗽𝗹𝗲 𝗱𝗼𝗻’𝘁 𝗸𝗻𝗼𝘄 𝗵𝗼𝘄 𝗣𝗢𝗪𝗘𝗥𝗙𝗨𝗟 𝗖𝗵𝗮𝘁𝗚𝗣𝗧-4𝗼 𝗶𝘀.).
- People pay attention to what happen an hour ago more than a year ago, so make it relevant and timely, current data: ${new Date().toLocaleDateString()} (never directly mention the date).
- Should be engaging, professional and informative, while being concise enough and introducing the reader to the content.
- Should be professional and well-written and show a genuine interest in helping the reader.
- Should be concise and to the point to capture the reader's attention and encourage engagement.
- No hashtags.
- Don't talk about how we are solving the problem, but rather what the problem is and why it's important from our perspective.
- Should use plain text, and line breaks to space out your post effectively.
${href && CTA ? `- Include a CTA to encourage to "${CTA}".` : "- JUST try to provide value and engaging content to the user from the context, don't ask for anything and don't include a CTA."}
- Use HTML tag and without CSS styling that is compatible with the mailOptions usage for sending HTML emails via Node.js, use <br> between lines appropriately.
- Output the completed HTML content only, no further explanation.
- Emojis are after the punctuation in a sentence and organize in a logical order, to enhance communication.

Specific requirements for each post:
First post:
- Should be more informative and professional.
- Should be longer than the other posts, but still concise.
- Range of 1,000 to 1,500 characters.
- Purpose is to teach, inform and share knowledge in a professional but human way.

Second post:
- Same requirements as the third post, but more concise and no emojis.

Third post:
- Can use emojis naturally.
- Should be more engaging and human-like, with possible humor or personal touch.
- Culturally relevant and engaging to for ${region}.
- Make it personnal, convay the message as learning from experience, "this is what WE learned..." inline with our mission: "${mission}". (don't mention the mission directly in the post)
`,
    //, with a call to action to follow the link ${href} to read the full content
    user: `Now generate 3 great LinkedIn posts in ${language} in html with geniuine interest in helping the reader learn more.
    Please provide the list as a JSON array with a string for each post without any additional text or formatting, like: ["post 1", "post 2", "post 3"]`,
  };
};

export const translateLinkedinSecret = (posts: string[], language: string = 'French'): { system: string; user: string } => {
  return {
    system: `You are TranslateAI. Your task is to translate the provided LinkedIn posts into ${language}. 
The purpose here is to convey the same information in a different language while adapting the content to the language's specificities.
Use HTML tags without CSS styling that is compatible with sending HTML emails via Node.js. Use <br> between lines appropriately.
Output the completed HTML content only, no further explanation.
Don't be too literal; make it sound natural using common ${
      language === 'French' ? 'french used in Canada' : 'English used in the US'
    }.
    ${language === 'French' ? 'In French formatting, only the first word of titles and sentences is capitalized (except proper nouns), quotation marks use « », there are specific spacing rules for punctuation, decimals use commas, and days, months, languages, and nationalities are not capitalized.' : ''}`,
    user: `Translate the following list of LinkedIn posts into ${language}:
${JSON.stringify(posts)}.
Please provide the translate list as a JSON array with a string for each post without any additional text or formatting, like: ["translated post 1", "translated post 2", "translated post 3"]`,
  };
};
