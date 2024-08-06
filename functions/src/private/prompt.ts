export const getListOfSubjectSecretPrompt = async (
  subject: string,
  target_audience: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `Split this subject: "${subject}" into subtitle for an article, you're a professional on this subject.
    The requirement for your task are the following:

    - You can choose the number of subtitle you want, but keep the number of subtitle under 7 maximum 
    - Each subtitle must have a distinct and clear meaning
    - Result must be in JSON format
    - Keep it short and easy to process
    - if the title include a number of points to develop, explore them and and always add a bonus item"

    - Always add an adapted introduction and closure but you could present it as fitted for the subject
    -introduction and closure must be in the list of subtitles
    -only return a list of content, nothing else
    - Simply output a JavaScript-like list of subtitle"`,
    user: `Accomplish the task by providing a list of subtitle for an article "${subject},
    your target audience for this is: "${target_audience}, DON'T MENTION THE TARGET AUDIENCE IN THE TEXT, THIS IS ONLY TO GUIDE THE NARRATION."
    `,
  };
};

export const getContentForSubtitlePrompt = async (
  subtitle: string,
  mission: string,
  subject: string,
  target_audience: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `Create few paragraph WITHOUT (introduction OR conclusion) for the subtitle: "${subtitle}" and the mission: "${mission}",
    you're a professional on this subject. 

    Your task is to generate engaging and informative content for each subtitle.
    The content should be designed to hold the reader’s attention and provide valuable information without overwhelming them.
    The text output is destined to bring organic traffic to a website.
    It should have a lot of different keywords related to the subject.

    Develop the content in a way that it is easy to read and understand.
    You should have a minimum of 4 paragraphs for each subtitle.

    The requirements are:
    - use html tags to format the text
    - write a professional and engaging content
    - make it concise and informative,
    - if you have to make a list, make it clear and easy to read
    - if you have to explain a concept, make it clear and easy to understand

    The target audience is busy people with short attention span and "${target_audience}" looking to learn about "${subject}" and "${subtitle}, DON'T MENTION THE TARGET AUDIENCE IN THE TEXT, THIS IS ONLY TO GUIDE THE NARRATION.".
    They value time efficiency, convenience. You should grab their attention as they have short attention spans.

    
    `,
    user: `Create content for the subtitle "${subtitle}, your target audience for this is: "${target_audience}, DON'T MENTION THE TARGET AUDIENCE IN THE TEXT, THIS IS ONLY TO GUIDE THE NARRATION."`,
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
    HERE'S A LIST OF THE SUBTITLE OF THIS ARTICLE TO HELP YOU DO LOGICAL TRANSITION BETWEEN THE INTRO AND THE REST OF THE ARTICLE AND FOR THE BULLET POINTS: ${subtitle}

    Your task is to generate engaging and informative content for each subtitle.
    The content should be designed to hold the reader’s attention and provide valuable information without overwhelming them.
    The text output is destined to bring organic traffic to a website.
    It should have a lot of different keywords related to the subject.

    The requirement are:
    - use html tags to format the text
    - write a professional and engaging content
    - make it concise and informative,
    - if you have to make a list, make it clear and easy to read
    - if you have to explain a concept, make it clear and easy to understand
    
    The target audience is busy people with short attention span and "${target_audience}" looking to learn about "${subject}".
    They value time efficiency, convenience. You should grab their attention as they have short attention spans.
    `,
    user: `Create an introduction respecting the requirements for the introduction: "${intro}, your target audience for this is: "${target_audience}, 
    DON'T MENTION THE TARGET AUDIENCE IN THE TEXT, THIS IS ONLY TO GUIDE THE NARRATION."`,
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
    - use html tags to make the content looks like a closure
    - write a professional and engaging content
    - make it concise and informative,
    - if you have to make a list, make it clear and easy to read
    - if you have to explain a concept, make it clear and easy to understand
    
    
    The target audience is busy people with short attention span and "${target_audience}" looking to learn about "${subject}" and "${closure}".
    They value time efficiency, convenience. You should grab their attention as they have short attention spans.
    MAKE SURE TO CREATE A CALL TO ACTION.
    THE CONCLUSION MUST BE AROUND THE MISSION AND THE SUBJECT, WITHOUT MENTIONING THEM DIRECTLY.
    `,
    user: `Create a conclusion respecting the requirements for the conclusion: "${closure}, your target audience for this is: "${target_audience}, 
    DON'T MENTION THE TARGET AUDIENCE IN THE TEXT, THIS IS ONLY TO GUIDE THE NARRATION."`,
  };
};

export const createImagePrompt = async (
  mission: string,
  subject: string,
  image: string,
  target_audience: string,
): Promise<string> => {
  return `Create an image of: "image", related to the subject: "${subject}" and keep in mind the mission: "${mission}",
  you're a professional on this subject. 

    Your task is to generate an image that is engaging and informative for the reader.
    The image should be designed to hold the reader’s attention and provide valuable information without overwhelming them.
    The image output is destined to bring organic traffic to a website.
    It should have a lot of different keywords related to the subject.

    The target audience is busy individuals looking to learn about "${subject}".
    Your target audience for this is: "${target_audience} looking to learn about "${subject}".
    They value time efficiency, convenience. You should grab their attention as they have short attention spans.
    `;
};

export const findSourcesItemPrompt = async (
  article: string,
  mission: string,
  subject: string,
  target_audience: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive an article, you find 3 key element of the article.
    You must return an array of string containing the key element.

    You will take 3 important elements of the article that a source could be added and ALSO be relevant.
    Keep in mind that these element must be relevant to the content.
    You will received the article, the mission and the subject.
    You will return a list of 3 key element of the article that a source could be added and ALSO be relevant.

    `,
    user: `You must return an array of string containing the key element. Here's the article: "${article}", the mission: "${mission}", the subject of the article: "${subject}".
    Find 3 key element of the article that a source could be added and ALSO be relevant. 
    Your target audience for this is: "${target_audience}`,
  };
};

export const addSourcesToItemPrompt = async (
  keyElement: string,
  subject: string,
  target_audience: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive an array of key element.
    You must find the 3 most important element of the article for this subject: "${subject}"
    Scrape the web to find 3 relevant sources for each of these elements.
    YOU WILL ONLY RETURN THE URL OF THE SOURCES.
    URL should be in the format: "www.example.com".
    Sources must be relevant to the content.
    Sources must be from reputable sources.
    Sources must be up-to-date.
    THE SOURCES MUST BE VALIDATED BEFORE RETURNING THEM.
    IMPORTANT: YOU MUST FIND ARTICLE RETATED TO THE SUBJECT AS SOURCES FOR AN ARTICLE.
    THE SOURCES MUST BE ARTCILE OR BLOGS. YOU SHOULD NOT RETURN HOMEPAGE, BUT LINK TO THE ARTICLE OR BLOG.


    You will find a relevant sources to EACH of the elements.
    You will return the sources in APA format.
    You must validate the sources before adding them to the article.
    You must verify if the link is still up-to-date.
    You must verify if the link redirect to the right page.
    The sources added should be relevant and add value to the article.

    The requirement are:
    -Add a maximum of 3 useful sources to the article.
    -The sources must be from academic sources.
    -The sources must be in APA format.
    -The sources must be relevant to the content.
    -The sources must be from reputable sources.
    -The sources must be up-to-date.
    -The sources must be cited correctly.
    -The sources must be added in the right place in the article.

    Keep in mind that these element must be relevant to the content.

    `,
    user: `Here's the array of key element: "${keyElement}". Find a relevant sources to each of these elements. 
    ${target_audience ? `Your target audience for this is: "${target_audience}"` : ''}`,
  };
};

export const parseUrlPrompt = async (sources: string): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive a list of sources.
    You will parse the sources to extract the domain name of the source.
    You will return the domain name of the source in a JSON format.

    Example: {
      "source1": "domain1",
      "source2": "domain2",
      "source3": "domain3",
    }

    `,
    user: `Parse the sources to extract the domain name of the source: "${sources}"`,
  };
};

export const addSourcesPrompt = async (
  article: string,
  sources: string[],
  listKeyElement: string,
  target_audience: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive an article, sources for the article and the key element associate to these sources.
    IMPORTANT: YOU NEED TO DELETE ALL HTML TAGS OF <A></A> OR ANY OTHER LINK TAGS. ADD THE SOURCE SHOULD BE IN APA FORMAT.
    You must link the sources to the key element in the article.
    You must put the sources at the right place, associate to the right key element. 
    You must add the sources to the article using APA format.
    IMPORTANT: YOU NEED TO RETURN ALL THE CONTENT OF THE ARTICLE GIVEN TO YOU.
    You will delete all link html tag already present in the article.
    Return all the article with the sources added in APA format and via html link tag.

    You will add the sources to the article in APA format AND via html link tag at the correct location.
    You will also remove all other html link from the article you are given.
    The sources must be implemented via html link.
    You must validate the sources before adding them to the article.
    You must verify if the link is still up-to-date.
    You must verify if the link redirect to the right page.
    The sources added should be relevant and add value to the article.
    You will remove all other html link that was there before this prompt.

    `,
    user: `Add sources to this article: "${article}.
    Here's the list of sources to add to this article: ${sources}" Here's the list of key element: ${listKeyElement}.
    You will return all the article with the sources added to it.
    Your target audience for this is: "${target_audience}
    IMPORTANT: YOU NEED TO DELETE ALL HTML TAGS OF <A></A> OR ANY OTHER LINK TAGS. ADD THE SOURCE SHOULD BE IN APA FORMAT. `,
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

    number of paragraph is up to you, choose wisely the number of paragraph you will use.
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

    
    Keep in mind that the mission is "${mission}" and the subject is "${subject}".
    The target audience is busy people with short attention span and "${target_audience}".`,
    user: `Improve this body: "${body}", your target audience for this is: "${target_audience}.
    DON'T DIRECTLY MENTION THE MISSION OR THE SUBJECT IN THE TEXT, THIS IS ONLY TO GUIDE THE NARRATION.
    `,
  };
};

export const editContentPrompt = async (article: string, lang: string): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive an article, you will edit it with the requirements that follow.
    IMPORTANT: YOU NEED TO DELETE ALL HTML TAGS OF <A></A> OR ANY OTHER LINK TAGS.

    - the conclusion subtitle should begin with "Conclusion: "
    - make sure to format it in html format
    - make sure the title of the article is in h1 tag with a seo-friendly id with human-readable keywords; followed by a p with id="intro", the seo title should be in ${lang}, 
    - make sure that the title is formatted for the language: ${lang}, per example, if the language is french, 
    - the title should be in the language: ${lang}, without uppercase except for the first world, and with the right accent.
    - translate the seo title you previously made in the right language

    IMPORTANT: YOU NEED TO MAKE SURE THAT ALL THE TITLE AND SUBTITLE RESPECT THE REQUIREMENT PREVIOUSLY MENTIONED.
    IF (${lang} == "french") {
      MAKE SURE THAT THE ONLY UPPERCASE LETTER IS THE FIRST LETTER OF THE SUBTITLE, FOR EACH ONES.
    }
    `,
    user: `Improve this article: "${article}
    Keep in ind that the first letter of each subtitle or title must always be in uppercase.
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
