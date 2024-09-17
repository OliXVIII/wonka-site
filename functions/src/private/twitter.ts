export const twitterSecretPrompt = (content: string, href: string, language: string): { system: string; user: string } => {
  return {
    system: `You create a popular Twitter posts within 280 characters.`,
    user: `
  Write a tweet in ${language}:
  
  - Max 280 characters.
  - Make it polarizing with a statement or a question that grabs the reader's attention and create a topic of discussion.
  EXEMPLE: 
    "99% of people don't know how POWERFUL ChatGPT-4o is.
    
    Because of these reasons, prove us wrong.".
  - No hashtags.
  - Use HTML tags and inline CSS compatible with Node.js mailOptions.
  - Output only the HTML content, no explanations.
  - Create a trendy tweet that could act as a good hook for the article content:
  "${content}"
  .

  
  Include a CTA to later prompt people to learn more about the main point of the article at "${href}", separated but included in the answer.
  `,
  };
};
