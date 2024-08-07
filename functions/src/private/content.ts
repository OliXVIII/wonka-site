export const getListOfSubjectSecretPrompt = async (
  subject: string,
  target_audience: string,
  mission: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `Split this subject: "${subject}" into subtitle for an article, you're a professional on this subject.
    The requirement for your task are the following:

    Each subtitle must be seo-friendly and contain keywords related to the subject.
    Seo-friendly means that the subtitle must be easy to read and understand for a human.
    and also contains keywords that a user (most importantly the target audience) would use to find the article.
    More importantly, subtitle must contains word that a user would use to search for the article.

    - You can choose the number of subtitle you think you be best (to the giver context (target audience, mission, subject)),
    but keep the number of subtitle under 7 maximum .
    - Each subtitle must have a distinct and clear meaning.
    - Result must be in JSON format.

    - Always add an adapted introduction and conclusion to the list of subtitles.
    - introduction and closure must be in the list of subtitles.
    - only return a list of content, nothing else.
    - Simply output a JavaScript-like list of subtitle.
    DON'T MENTION THE TARGET AUDIENCE IN THE TEXT, THIS IS ONLY TO GUIDE THE NARRATION.`,
    user: `Accomplish the task by providing a list of subtitle for an article on the subject: "${subject}", 
    your target audience for this is: "${target_audience}", and the mission is: "${mission}".
    
    `,
  };
};

export const getContentForSubtitlePrompt = async (
  subtitle: string,
  mission: string,
  subject: string,
  target_audience: string,
  listSubtitle: string[],
): Promise<{ system: string; user: string }> => {
  return {
    system: `Create a text, this text is a part of an article
    You only write the section associated with the subtitle: "${subtitle}".
    WITHOUT (introduction OR conclusion) for the subtitle: "${subtitle}" and the mission: "${mission}",
    you're a professional on this subject.
    your target audience for this is: "${target_audience}"
    The subject of the article is: "${subject}".

    You're job is to write the section of the subtitle given to you.

    Use various method to display the content in a way that it is easy to read and understand to the reader,
    choose one that fits the best for the subject.

    You can use as many paragraph as you want, but keep in mind that the text should be concise and informative,
    because there will be others part of the article and you don't want the article to be too long.

    Your task is to generate engaging and informative content for the subtitle.
    The content should be designed to hold the reader’s attention and provide valuable information without overwhelming them.
    The text output is destined to bring organic traffic to a website.
    It should have a lot of different keywords related to the subject.

    Develop the content in a way that it is easy to read and understand.

    The requirements are:
    - write a professional and engaging content.
    - make it concise and informative.
    - make the text clear and easy to read and to understand.

    The people that will read the text value time efficiency and convenience.
    You should grab their attention as they have short attention spans.

    Make a one liner closing sentence to transition to the next subtitle.
    Here's a list of the subtitle of this article to help you do logical transition between the content: ${listSubtitle}.

    DON'T MENTION THE TARGET AUDIENCE IN THE TEXT, THIS IS ONLY TO GUIDE THE NARRATION.
    `,
    user: `
    Create content for the subtitle "${subtitle}, your target audience for this is: "${target_audience}, the mission is: "${mission}".
    The subject of the article is: "${subject}".
    `,
  };
};

export const getContentForIntroPrompt = async (
  intro: string,
  mission: string,
  subject: string,
  target_audience: string,
  subtitle: string[],
): Promise<{ system: string; user: string }> => {
  return {
    system: `Create introduction for the intro: "${intro}" and the mission: "${mission}",
    you're a professional on this subject. 
    USE BULLET POINT TO PRESENT THE REST OF THE ARTICLE.
    HERE'S A LIST OF THE SUBTITLE OF THIS ARTICLE TO HELP YOU DO LOGICAL TRANSITION BETWEEN THE INTRO
    AND THE REST OF THE ARTICLE AND FOR THE BULLET POINTS: ${subtitle}.
    
    The introduction is the first thing the reader will see, it should be engaging and informative.
    The introduction must be design in a way to keep the reader on the site, the is what will bring them on the website.
    It should also create a Call to Action related to the mission: "${mission}".

    The content should be designed to hold the reader’s attention and provide valuable information without overwhelming them.
    The text output is destined to bring organic traffic to a website.
    It should have a lot of different keywords related to the subject.

    The requirement are:
    - write a professional and engaging content
    - make it concise and informative,
    - if you have to make a list, make it clear and easy to read
    - if you have to explain a concept, make it clear and easy to understand
    
    The target audience is busy people with short attention span and "${target_audience}" looking to learn about "${subject}".
    They value time efficiency, convenience. You should grab their attention as they have short attention spans.
    DON'T MENTION THE TARGET AUDIENCE IN THE TEXT, THIS IS ONLY TO GUIDE THE NARRATION.
    `,
    user: `Create an introduction respecting the requirements for the introduction: "${intro},
    your target audience for this is: "${target_audience}, 
    keep in mind that the mission is ${mission} and the subject is ${subject}.
    `,
  };
};
export const getContentForClosurePrompt = async (
  closure: string,
  mission: string,
  subject: string,
  target_audience: string,
  subtitle: string[],
): Promise<{ system: string; user: string }> => {
  return {
    system: `Create conclusion for the subtitle: "${closure}" and the mission: "${mission}", you're a professional on this subject.
    Here's a list of subtitles of this article to help you create a logical conclusion with the rest of the article: ${subtitle}
    The text output is destined to bring organic traffic to a website.
    It should have a lot of different keywords related to the subject.
    Summarize the key points and encourage the reader to take action. 
    
    The requirement are:
    - write a professional and engaging content
    - make it concise and informative,
    - if you have to make a list, make it clear and easy to read
    - if you have to explain a concept, make it clear and easy to understand
    
    
    The target audience is busy people with short attention span and "${target_audience}" looking to learn about "${subject}" and "${closure}".
    They value time efficiency, convenience. You should grab their attention as they have short attention spans.
    MAKE SURE TO CREATE A CALL TO ACTION.
    THE CONCLUSION MUST BE AROUND THE MISSION AND THE SUBJECT, WITHOUT MENTIONING THEM DIRECTLY.
    DON'T MENTION THE TARGET AUDIENCE IN THE TEXT, THIS IS ONLY TO GUIDE THE NARRATION."
    `,
    user: `Create a conclusion respecting the requirements for the conclusion: "${closure},
    your target audience for this is: "${target_audience},
    the mission is ${mission} and the subject is ${subject}.
    the theme of the conclusion is: ${subtitle}.
    `,
  };
};

export const improveIntroPrompt = async (
  intro: string,
  mission: string,
  subject: string,
  target_audience: string,
  lang: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive an introduction, you will improve it, better it, make it coherent betweens parts.
    Keep in mind that the introduction is the first thing the reader will see, it should be engaging and informative.
    The introduction should be designed to hold the reader’s attention and provide valuable information without overwhelming them.
    The text output is destined to bring organic traffic to a website.
    It should have a lot of different keywords related to the subject.
    
    - the first paragraph should be a short introduction of the article
    - write a professional and engaging content
    - use no special characters like "#" or "*" or any other markdown
    - delete all special characters like "#" or "*" or any other markdown
    - write the article a way a user would expect it to looks like on a website
    - make it concise and informative,
    - if you have to make a list, make it clear and easy to read
    - if you have to explain a concept, make it clear and easy to understand
    - make sure the text is in language: ${lang}
    - Each paragraph must be a maximum of 3 sentences.

    
    Keep in mind that the mission is "${mission}" and the subject is "${subject}".
    The target audience is busy people with short attention span and "${target_audience}".`,
    user: `Improve this introduction: "${intro}", your target audience for this is: "${target_audience}.
    DON'T DIRECTLY MENTION THE MISSION OR THE SUBJECT IN THE TEXT, THIS IS ONLY TO GUIDE THE NARRATION.
    `,
  };
};

export const improveConclusionPrompt = async (
  conclusion: string,
  mission: string,
  subject: string,
  target_audience: string,
  lang: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive a conclusion, you will improve it, better it, make it coherent betweens parts.
    Keep in mind that the conclusion is the last thing the reader will see, it should conclude the article in a professional and engaging way.
    The conclusion must also be design in a way to create a Call to Action related to the mission: "${mission}".
    The text output is destined to bring organic traffic to a website.
    It should have a lot of different keywords related to the subject.
    The title of the conclusion should begin with "Conclusion: "
    
    - write a professional and engaging content
    - use no special characters like "#" or "*" or any other markdown
    - delete all special characters like "#" or "*" or any other markdown
    - write the article a way a user would expect it to looks like on a website
    - make it concise and informative,
    - if you have to make a list, make it clear and easy to read
    - if you have to explain a concept, make it clear and easy to understand
    - make sure the text is in language: ${lang}
    - Each paragraph must be a maximum of 3 sentences.

    
    Keep in mind that the mission is "${mission}" and the subject is "${subject}".
    The target audience is busy people with short attention span and "${target_audience}".`,
    user: `Improve this conclusion: "${conclusion}", your target audience for this is: "${target_audience}.
    DON'T DIRECTLY MENTION THE MISSION OR THE SUBJECT IN THE TEXT, THIS IS ONLY TO GUIDE THE NARRATION.
    `,
  };
};

export const improveBodyPrompt = async (
  body: string,
  mission: string,
  subject: string,
  target_audience: string,
  lang: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive a part of an article, you will improve it, better it, make it coherent betweens parts.
    Keep in mind that the introduction is the first thing the reader will see, it should be engaging and informative.
    The body should be designed to hold the reader’s attention and provide valuable information without overwhelming them.
    Each paragraph must be a maximum of 3 sentences.

    You should have between 3 and 8 paragraphs for each subtitle.

    number of paragraph is up to you, choose wisely the number of paragraph you will use.
    The text output is destined to bring organic traffic to a website.
    It should have a lot of different keywords related to the subject.
    
    - make sure the text is in language: ${lang}

    
    Keep in mind that the mission is "${mission}" and the subject is "${subject}".
    The target audience is busy people with short attention span and "${target_audience}".`,
    user: `Improve this body: "${body}", your target audience for this is: "${target_audience}.
    DON'T DIRECTLY MENTION THE MISSION OR THE SUBJECT IN THE TEXT, THIS IS ONLY TO GUIDE THE NARRATION.
    `,
  };
};

export const editContentPrompt = async (
  article: string,
  lang: string,
  target_audience: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive an article, you will edit it with the requirements that follow.

    - the conclusion subtitle should begin with "Conclusion: "
    - make sure to format it in html format.
    
    IMPORTANT:
    - make sure the title of the article is in h1 tag with a seo-friendly id with human-readable keywords;
    - MODIFY THE TITLE TO BE SURE THAT THE H1 TITLE IS GREAT FOR SEO.
    followed by a p with id="intro", the seo title should be in ${lang}, 
    - VERY IMPORTANT: remove any adverbs or adjectives that are not necessary for the seo title, only keyword for the SEO title, also make sure that the seo title is in ${lang},
    - the seo title should use word that a ${target_audience} would use to search for the article.
    - the seo title should also be the title of the article, but formated to be the seo title.
    - make sure that the title is formatted for the language: ${lang}, per example, if the language is french, 
    - the title should be in the language: ${lang}, without uppercase except for the first world, and with the right accent.
    - translate the seo title you previously made in the right language

    IMPORTANT: YOU NEED TO MAKE SURE THAT ALL THE TITLE AND SUBTITLE RESPECT THE REQUIREMENT PREVIOUSLY MENTIONED.
    IF (${lang} == "french") {
      MAKE SURE THAT THE ONLY UPPERCASE LETTER IS THE FIRST LETTER OF THE SUBTITLE, FOR EACH ONES.
    }
    `,
    user: `Edit this article: "${article}
    edit any word that a normal user would not understand, make sure to make the text easy to read and understand.
    If the article use abbreviations, make sure to write the full word and the abbreviation in parenthesis.
    Keep in ind that the first letter of each subtitle or title must always be in uppercase.
    - make sure the title of the article is in h1 tag with a seo-friendly id with human-readable keywords;
    - MODIFY THE TITLE TO BE SURE THAT THE H1 TITLE IS GREAT FOR SEO.
    followed by a p with id="intro", the seo title should be in ${lang}, 
    - remove any adverbs or adjectives that are not necessary for the seo title, only keyword for the SEO title,
    - the seo title should also be the title of the article, but formated to be the seo title.

    IMPORTANT: the text must be in ${lang}, if the text is not in ${lang}, you must translate it in ${lang} before improving it.

    EACH PARAGRAPH MUST ONLY BE A MAXIMUM OF 3 SENTENCES.
    THE FIRST <P></P> MUST BE A SHORT INTRODUCTION OF THE ARTICLE. THIS SHOULD BE A MAXIMUM OF 2 SENTENCES.
    The first <p></p> should not have any <strong></strong>, <em></em>, <a></a> or any other html tags.
    THIS SHOULD BE AN OVERVIEW OF THE ARTICLE, NOT A SUMMARY. IT SHOULD MAKE THE READER WANT TO CLICK ON THE ARTICLE AND READ IT.

    DON'T PUT "INTRODUCTION" OR "CLOSURE" IN THE TEXT, ONLY THE CONTENT OF THE ARTICLE NOR IN THE TITLE.
    THE FINAL RESULT MUST BE IN HTML TAGS.
    IMPORTANT: YOU NEED TO DELETE ALL HTML TAGS OF <A></A> OR ANY OTHER LINK TAGS.

    `,
  };
};
