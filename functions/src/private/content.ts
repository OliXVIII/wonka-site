// export const getContextPrompt = async (context: string): Promise<{ system: string; user: string }> => {
//   return {
//     system: `You will receive a context, your job is to create a mission and context for an article based on this context.
//     The mission is the goal of the article, it's what the article is trying to achieve.
//     The context is the main topic of the article, it's what the article is about.

//     IF THERE IS A IMPORTANT POINT TO MENTION, MAKE SURE TO INCLUDE IT IN THE MISSION OR THE context.
//     IF THERE ARE IMPORTANT POINTS TO ENUMERATE, MAKE SURE TO INCLUDE THEM IN THE MISSION OR THE context.

//     Your output MUST be in the following JSON format:
//     {
//       "mission": "Your mission here",
//       "context": "Your context here"
//     }
//     `,
//     user: `Here is the context you will use to create the mission and context for the article: ${context}
//     `,
//   };
// };

// export const createSEOTitlePrompt = async (
//   context: string,
//   targetAudience: string,
//   mission: string,
//   lang: string,
// ): Promise<{ system: string; user: string }> => {
//   return {
//     system: `You will receive a context, a mission and a target audience you will create a seo-friendly title for an article.
//     Take the subject as a whole to create the title, don't be specific to the article.
//     DON'T PUT ANY ACCENT IN THE TITLE. EX: "é" should be "e".
//     - there will be no whitespace.
//     - there should only be one word per section of the title : "word1-word2-word3".
//     - the 3 keywords must be the most important keywords of the article.
//     VERY IMPORTANT: IT SHOULD HAVE A MAXIMUM OF 4 KEYWORDS.
//     ONLY USE THE MOST IMPORTANT KEYWORDS.
//       SEO title must not have any adverb
//       or any useless word that are not necessary for the seo title, only use keyword for the SEO title,
//       also make sure that the seo title is in "${lang}"
//       - the seo title should use words that a "${targetAudience}" would use to search for the article.
//       - a great seo title have key word that a user would use to search for the article.
//       - the seo title will not have any whitespace or special character.
//       `,
//     user: `Create a great seo title in ${lang} for an article.
//     VERY IMPORTANT: IT SHOULD HAVE A MAXIMUM OF 4 KEYWORDS.
//     ONLY USE THE MOST IMPORTANT KEYWORDS.
//     EVERY KEYWORDS MUST BY SEPARATED BY A "-" (DASH).
//     Here is the context you will use to create the seo title: "${context}",
//     your target audience for this is: "${targetAudience}",
//     and the mission is: "${mission}".

//     Make sure the title is not exactly the same as the context. (should use different word)
//     The word of the seo title mush be composed of keyword that a user (target audience) would use to search for the article.`,
//   };
// };
export const createSEOTitlePrompt = async (
  prompt: string,
  targetAudience: string,
  mission: string,
  lang: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `Generate an SEO-friendly title for an article based on the provided context, mission, and target audience.
    ${lang === 'French' ? '- Only use uppercase for the first letter of the title. Only the first letter of the first word should be capitalized, for the other word:  first letter should be lowercased. for normal use.' : ''}
    - Title must be in language: "${lang}".
    - Use the most relevant keywords that the target audience would likely search for.
    - Ensure the title is in "${lang}" and uses different words from the provided context.
    - Avoid accents, adverbs, and unnecessary words.
    ${lang === 'French' ? '- Only use uppercase for the first letter of the title. Only the first letter of the first word should be capitalized, for the other word:  first letter should be lowercased. for normal use.' : ''}
    `,

    user: `Create a concise SEO title in ${lang} for an article about "${prompt}".
    - Use the target audience: "${targetAudience}", and mission: "${mission}".
    - Ensure the title aligns with common search behavior and is not identical to the context.
    ${lang === 'French' ? '- Only use uppercase for the first letter of the title. Only the first letter of the first word should be capitalized, for the other word:  first letter should be lowercased. for normal use.' : ''}
    `,
  };
};

export const getListOfSubjectSecretPrompt = async (
  context: string,
  targetAudience: string,
  mission: string,
  seoTitle: string,
  lang: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `Use the context to create subtitles for an article, while following the instructions of the context,
    you're a professional on the subject.
    The requirement for your task are the following:
    ${lang === 'French' ? '- Only use uppercase for the first letter of the title. Only the first letter of the first word should be capitalized, for the other word:  first letter should be lowercased. for normal use.' : ''}
    - Make sure the text in the language: "${lang}".
    - Make sure the subtitles don't repeat the same information.
    - Each subtitle must be seo-friendly and contain keywords related to the context.
    - You can choose the number of subtitle you think you be best (using the given information (target audience, mission, context)),
    but keep the number of subtitle under 6 maximum.
    - Each subtitle must have a distinct and clear meaning.
    - Result must be in JSON format.
    - Always add an adapted introduction and conclusion to the list of subtitles.
    - only return a list of content, nothing else.
    - Simply output a JavaScript-like Object Notation list of subtitle.
    - Don't mention the target audience, this is only to guide the narration.
    - Only return an array of subtitle, nothing else.
    `,
    user: `Write an array of subtitle for the following context: "${context}".
    Your target audience is"${targetAudience}", and the mission is: "${mission}".
    You have a SEO title you can use for addition information: "${seoTitle}".
    SEO TITLE MUST NOT BE IN THE LIST OF SUBTITLE.
    `,
  };
};

export const getBodyPrompt = async (
  subtitle: string,
  mission: string,
  context: string,
  targetAudience: string,
  listSubtitle: string[],
): Promise<{ system: string; user: string }> => {
  return {
    system: `Create a text, this text is a section of an article.
    It should respect the requirement that follow:
    "
    - This section should have a minimum of 4 paragraphs.
    - You will be given a subtitle of the article and the mission of the article, the text must reflect of those.
    - You will also be given a context, this context will act as a set of instructions for the text you will create.
    - Make sure the content is related to the mission of the article: "${mission}".
    - Your task is to generate engaging and informative content for the subtitle.
    - The content should be designed to hold the reader’s attention and provide valuable information without overwhelming them.
    - The text output is destined to bring organic traffic to a website.
    - It should have a lot of different keywords related to the context.
    - The people that will read the text don't necessarily have a lot of knowledge on the subject.
    - You should grab the readers attention with genuine interest in helping them.
    - Make a one liner closing sentence to transition to the next subtitle.
    -  Here's a list of the subtitle of this article to help you do logical transition between the content, 
    they are in order, so the subtitle next to ${subtitle} in the list is the subtitle of the next paragraph of the article: ${listSubtitle}.
    - Don't mention the target audience in the text, this is only to guide the narration.
    `,
    user: `
    Create content for the subtitle "${subtitle}, your target audience for this is: "${targetAudience}, the mission is: "${mission}".
    The context of the article is, use the context as instructions: "${context}".
    `,
  };
};

export const getIntroPrompt = async (
  intro: string,
  mission: string,
  context: string,
  targetAudience: string,
  subtitle: string[],
  lang: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `Write introduction for the title: "${intro}" and the mission ${mission}", you're a professional on the subject.
    Respect the requirement that follow: "
    - Use bullet point to present de rest of the article.
    - Use the list of subtitle to create logical transition in the intro and the rest of the article: ${subtitle}
    - The introduction should be engaging and informative.
    - The introduction must be designed in a way to keep the reader on the site.
    - The content should be designed to hold the reader’s attention and provide valuable information without overwhelming them.
    - The text output is destined to bring organic traffic to the website.
    - It should have a lot of different keywords related to the context.
    - if you have to explain a concept, make it clear and easy to understand.
    - Don't mention the target audience in the text, this is only to guide the narration.
    ${lang === 'French' ? '- Only use uppercase for the first letter of the title. Only the first letter of the first word should be capitalized, for the other word:  first letter should be lowercased. for normal use.' : ''}
    - Make sure the text in the language: ${lang}.

    "
    `,
    user: `Create an introduction respecting the requirements for the introduction: "${intro},
    your target audience for this is: "${targetAudience}, 
    Keep in mind that the mission is ${mission} and the context is "${context}".
    `,
  };
};
export const getConclusionPrompt = async (
  closure: string,
  mission: string,
  context: string,
  targetAudience: string,
  subtitle: string[],
  lang: string,
  CTA: string,
  domain: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `Create conclusion with all the information you will be given, you're a professional on this context.
    You will receive the subtitle of the conclusion, the mission, the context and the target audience.
    You will respect the requirement that follow:
    "
    - Make sure the conclusion is related to the mission.
    - The conclusion title should be pertinent to the article.
    - Make sure the conclusion title is interesting and engaging.
    - The conclusion subtitle should begin with "Conclusion: ".
    - You will also receive a list of subtitles of this article to help you create a logical conclusion with the rest of the article.
    - The text output is destined to bring organic traffic to a website.
    - Summarize the key points and encourage the reader to take action, about the CTA (call to action): "${CTA}".
    - Use the call to action in a intuitive way.
    - Make sure the conclusion is related to the mission of the article: "${mission}".
    - Link the domain of the client for further information: "${domain}", use a link html tag to the website, don't mention the url in the text, use by example "click here for further information". 
    - Make the link in the conclusion in a way that the reader will want to click on it. 
    - Make it concise and informative.
    - If you have to explain a concept, make it clear and easy to understand
    - The call to action should be related to the mission.
    - The Call to Action (CTA) must be in a different paragraph, at last.
    - Don't use word for word the information given to you.
    - Don't mention the target audience in the text, this is only to guide the narration.
    - Put the conclusion as a title in the closure.
    ${lang === 'French' ? '- Only use uppercase for the first letter of the title. Only the first letter of the first word should be capitalized, for the other word:  first letter should be lowercased. for normal use.' : ''}
    - Make sure the text in the language: ${lang}
    "
    `,
    user: `Create a conclusion respecting the requirements for the conclusion: "${closure},
    your target audience is: "${targetAudience}:,
    the mission is: "${mission}" and the context is "${context}".
    Here's a list of the subtitle of this article to help you do logical transition between the content: ${subtitle}.
    `,
  };
};

export const improveConclusionPrompt = async (
  closure: string,
  mission: string,
  prompt: string,
  targetAudience: string,
  subtitle: string[],
  lang: string,
  CTA: string,
  domain: string,
  conclusion: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `Edit the given conclusion to make sure it respect these requirements: 
    "
    - The conclusion title should be pertinent to the article.
    - Summarize the key points and encourage the reader to take action, about the CTA (call to action): "${CTA}".
    - Use the call to action in a intuitive way.
    - Make sure the conclusion is related to the mission of the article: "${mission}".
    - Link the domain of the client for further information: "${domain}", use a link html tag to the website, don't mention the url in the text, use by example "click here for further information". 
    - Make the link in the conclusion in a way that the reader will want to click on it. 
    - The call to action should be related to the mission.
    - The Call to Action (CTA) must be in a different paragraph, at last.
    - Don't use word for word the information given to you.
    - Don't mention the target audience in the text, this is only to guide the narration.
    "
    `,
    user: `Create a conclusion respecting the requirements for the conclusion: "${closure},
    your target audience is: "${targetAudience}:,
    the mission is: "${mission}" and the context is "${prompt}".
    Here's the conclusion you will improve: "${conclusion}".
    `,
  };
};

export const improveBodyPrompt = async (
  content: string,
  lang: string,
  listOfSubtitles: string[],
  context: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive the body of an article, you will improve it with the requirements that follow:
    - Each part of the body must have at least 4 paragraphs.
    - Make logic transition each part of the body.
    - Make sure the language of the text is in ${lang}, even the subtitle.
    ${lang === 'French' ? '- Only use uppercase for the first letter of the title. Only the first letter of the first word should be capitalized, for the other word:  first letter should be lowercased. for normal use.' : ''}
    - Develop and explain each ideas.
    - Make sure that the information of the text is display is various way.
    - Make sure bullet points are used in the text. Add them in a MAXIMUM of 2 or 3 SECTIONS.
    - Make sure that the text looks like a professional article made by a human.
    - Make sure that the different section doesn't have the same structure, make sure that the different section don't look alike.
    - You will need to separate the text in small paragraphs.
    - Check the length of each paragraph, if one one is too long, split it.
    - The text output is destined to bring organic traffic to a website.
    `,
    user: `Here's the content of the body of the article: "${content}" and the multiple subtitles of the article: ${listOfSubtitles}.
    Your main job is to make sure the text is not redundant.
    Make sure the body respect the instruction of the context: "${context}"
    `,
  };
};

export const editContentPrompt = async (
  article: string,
  lang: string,
  subtitleList: string[],
  greatestTitle: string,
  context: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive an article, you will edit it with the requirements that follow.

    ${lang === 'French' ? '- Only use uppercase for the first letter of the title. Only the first letter of the first word should be capitalized, for the other word:  first letter should be lowercased. for normal use.' : ''}
    - Remove the "Introduction: " from the introduction title.
    - If acronyms are used, make sure the acronym is written in full the first time it is used, followed by the acronym in parenthesis.
    - If acronyms are used make sure the acronyms is written in capital letters.
    - Make sure to format it in html format.    
    - Here's a list of the subtitle of this article to help you do logical transition between the content: "${subtitleList}" and to help you format the text in html format.
    - You will add the title  in a h1 tag at the beginning of the article: "${greatestTitle}".
    - Make sure that all the text is in language: "${lang}", even the subtitle.
    - If the article use abbreviations, make sure to write the full word and the abbreviation in parenthesis.
    - THE FIRST <P></P> MUST BE A SHORT INTRODUCTION OF THE ARTICLE. THIS SHOULD BE A MAXIMUM OF 2 SENTENCES.
    - The first <p></p> should not have any <strong></strong>, <em></em>, <a></a> or any other html tags.
    ${lang === 'French' ? '- Only use uppercase for the first letter of the title. Only the first letter of the first word should be capitalized, for the other word:  first letter should be lowercased. for normal use.' : ''}
    - Make sure the mission is not mentioned literally in the test, it should be implicit, only to guide the narration.
    - Make sure that each paragraph is separated by a <p></p> tag.
    - Remove any markup that is not necessary for the article.
    - Make sure the article follow the instructions of the context: "${context}".
    - If bullet point are used in the text, make sure the first word of each bullet point, only the ones before an ":" is in bold.
    - The text output is destined to bring organic traffic to a website.
    `,
    user: `Edit this article: "${article}".
    Don't forget the call to action at the end of the article.`,
  };
};

export const createGreatestTitleEverMadePrompt = async ({
  prompt,
  targetAudience,
  mission,
  lang,
}: {
  prompt: string;
  targetAudience: string;
  mission: string;
  lang: string;
}): Promise<{ system: string; user: string }> => {
  //TODO: Use mission simply here
  return {
    system: `Your task is to return a JSON object with 2 field 'id' and 'title'
    Id must a valid, long enough to be unique but still short, SEO id representing the title.
    Title must:
      - Be short, concise and engaging (no more than 8 words).
      - Clearly convey what the article is about without giving away too much.
      - Be highly engaging and draw the reader's attention.
      - Contain keywords that the target audience would use to search for the article.
      - Do NOT mention the target audience directly in the title.
      - Be SEO FRIENDLY.
      - Avoid using colons (:) or any special characters.
      ${lang === 'French' ? '- Only use uppercase for the first letter of the title. Only the first letter of the first word should be capitalized, for the other word:  first letter should be lowercased. for normal use.' : ''}


    Here's our context:
    target audience: "${targetAudience}".
    mission: "${mission}".`,

    user: `Create the best possible 'id' and 'title' for this article "${prompt}" in ${lang}.`,
  };
};

export const addInstructionToPromptPrompt = async (context: string): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive a small context, the context is too short to be used as a prompt.
    Your job will be to develop this context into a list of instruction to create an article from it, with a genuin interest in helping the readers.

    You will only guide the writing of the text, never suggest to add something to it.
    Output only the revised context, nothing else.`,
    user: `Here is the context you will use to create the instruction for the creation of the article: ${context}
    `,
  };
};
