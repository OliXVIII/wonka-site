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

export const createSEOTitlePrompt = async (
  context: string,
  target_audience: string,
  mission: string,
  lang: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive a context, a mission and a target audience you will create a seo-friendly title for an article.
    VERY IMPORTANT: IT SHOULD HAVE A MAXIMUM OF 3 KEYWORDS.
    ONLY USE THE MOST IMPORTANT KEYWORDS.
      SEO title must not have any adverb
      or any useless word that are not necessary for the seo title, only use keyword for the SEO title, 
      also make sure that the seo title is in "${lang}"
      - the seo title should use words that a "${target_audience}" would use to search for the article.
      - a great seo title have key word that a user would use to search for the article.
      - the seo title will not have any whitespace or special character.
      `,
    user: `Create a great seo title for the article.
    VERY IMPORTANT: IT SHOULD HAVE A MAXIMUM OF 3 KEYWORDS.
    ONLY USE THE MOST IMPORTANT KEYWORDS.
    EVERY KEYWORDS MUST BY SEPARATED BY A "-" (DASH).
    Here is the context you will use to create the seo title: "${context}", 
    your target audience for this is: "${target_audience}", 
    and the mission is: "${mission}".
    
    Make sure the title is not exactly the same as the context. (should use different word)
    The word of the seo title mush be composed of keyword that a user (target audience) would use to search for the article.`,
  };
};

export const getListOfSubjectSecretPrompt = async (
  context: string,
  target_audience: string,
  mission: string,
  seoTitle: string,
  language: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `Use the context to create subtitles for an article, while following the instructions of the context.
    You're a professional on this context.
    The requirement for your task are the following:

    IMPORTANT: YOU NEED TO MAKE SURE THAT ALL THE TITLE AND SUBTITLE RESPECT THE REQUIREMENT PREVIOUSLY MENTIONED.
    IF (${language} == "french" || ${language} == "francais") {
      MAKE SURE THAT THE ONLY UPPERCASE LETTER IS THE FIRST LETTER OF THE SUBTITLE, FOR EACH ONES.
      EXCEPT FOR ABBREVIATIONS.
    }

    Make sure the subtitles don't repeat the same information.

    Each subtitle must be seo-friendly and contain keywords related to the context.
    I
    IMPORTANT: Each subtitle must contains keywords that a user (most importantly the target audience) would use while searching for the subject.

    - You can choose the number of subtitle you think you be best (using the given information (target audience, mission, context)),
    but keep the number of subtitle under 6 maximum .
    - Each subtitle must have a distinct and clear meaning.
    - Result must be in JSON format.

    - Always add an adapted introduction and conclusion to the list of subtitles.
    - introduction and closure must be in the list of subtitles.
    - only return a list of content, nothing else.
    - Simply output a JavaScript-like Object Notation list of subtitle.
    DON'T MENTION THE TARGET AUDIENCE IN THE SUBTITLE, THIS IS ONLY TO GUIDE THE NARRATION.`,
    user: `ONLY RETURN AN ARRAY OF SUBTITLE, NOTHING ELSE.
    HERE IS THE CONTEXT, VERY IMPORTANT TO FOLLOW IT: "${context}".
    Accomplish the task by providing a list of subtitle for an article using the context, 
    your target audience for this is: "${target_audience}", and the mission is: "${mission}".
    You have a SEO title you can use for addition information: "${seoTitle}".
    Make sure the title of the article is short and concise.

    IMPORTANT: TARGET AUDIENCE MUST NOT BE EXPLICITLY IN THE LIST OF SUBTITLE.

    VERY IMPORTANT: THE CONTEXT MUST NOT BE EXPLICITLY IN THE LIST OF SUBTITLE.

    Make sure that only the first letter of the title is uppercase.
    SEO TITLE MUST NOT BE IN THE LIST OF SUBTITLE.
    `,
  };
};

export const getBodyPrompt = async (
  subtitle: string,
  mission: string,
  context: string,
  target_audience: string,
  listSubtitle: string[],
): Promise<{ system: string; user: string }> => {
  return {
    system: `Create a text, this text is a section of an article.
    This section should have a minimum of 4 paragraphs.
    You will be given a subtitle of the article and the mission of the article.
    You will also be given a context, this context will act as a set of instructions for the text you will create.
    Develop on the context of this section, don't be afraid to make a long section if needed.

    IMPORTANT: The text output should have a MINIMUM of 4 paragraphs, feel free to add more if you think it's necessary.

    Your job is to write the section of the subtitle given to you.
    Make sure the content is related to the mission of the article: "${mission}".

    Your task is to generate engaging and informative content for the subtitle.
    The content should be designed to hold the reader’s attention and provide valuable information without overwhelming them.
    The text output is destined to bring organic traffic to a website.
    It should have a lot of different keywords related to the context.

    Develop the content in a way that it is easy to read and understand.

    The requirements are:
    - write a professional and engaging content.
    - make the text clear and easy to read and to understand.

    The people that will read the text value time efficiency and convenience.
    The people that will read the text don't necessarily have a lot of knowledge on the subject.
    You should grab their attention as they have short attention spans.

    Make a one liner closing sentence to transition to the next subtitle.
    Here's a list of the subtitle of this article to help you do logical transition between the content, 
    they are in order, so the subtitle next to ${subtitle} in the list is the subtitle of the next paragraph of the article: ${listSubtitle}.

    DON'T MENTION THE TARGET AUDIENCE IN THE TEXT, THIS IS ONLY TO GUIDE THE NARRATION.
    `,
    user: `
    Create content for the subtitle "${subtitle}, your target audience for this is: "${target_audience}, the mission is: "${mission}".
    The context of the article is, use the context as instructions: "${context}".
    Develop your ideas and make everything is well explained.
    The text output should have a MINIMUM of 4 paragraphs.
    Explain the concept well and make sure that the text is engaging.
    Make the format of the text adequate for the context and the target audience.

    IMPORTANT: "For SEO purpose, make sure to use keyword related to the context in the text. 
    You also need to use keyword that the target audience would use to search for the article."
    Here's the list of subtitle of all the section of the article to help you do logical transition between the content: ${listSubtitle}.
    `,
  };
};

export const getIntroPrompt = async (
  intro: string,
  mission: string,
  context: string,
  target_audience: string,
  subtitle: string[],
): Promise<{ system: string; user: string }> => {
  return {
    system: `Write introduction for the intro: "${intro}" and the mission",
    you're a professional on this context. 
    USE BULLET POINT TO PRESENT THE REST OF THE ARTICLE.
    HERE'S A LIST OF THE SUBTITLE OF THIS ARTICLE TO HELP YOU DO LOGICAL TRANSITION BETWEEN THE INTRO
    AND THE REST OF THE ARTICLE AND FOR THE BULLET POINTS: ${subtitle}.
    DON'T MENTION THE FIRST AND LAST ELEMENT OF THE LIST OF SUBTITLE IN THE TEXT.

    USE THE CONTEXT AS INSTRUCTION FOR THE INTRODUCTION.

    You need to introduce all the rest of the article (use bullet point)
    
    The introduction is the first thing the reader will see, it should be engaging and informative.
    The introduction must be design in a way to keep the reader on the site, the is what will bring them on the website.

    The content should be designed to hold the reader’s attention and provide valuable information without overwhelming them.
    The text output is destined to bring organic traffic to a website.
    It should have a lot of different keywords related to the context.

    The requirement are:
    - write a professional and engaging content
    - make it concise and informative,
    - if you have to explain a concept, make it clear and easy to understand
    
    They value time efficiency, convenience. You should grab their attention as they have short attention spans.
    DON'T MENTION THE TARGET AUDIENCE IN THE TEXT, THIS IS ONLY TO GUIDE THE NARRATION.
    `,
    user: `Create an introduction respecting the requirements for the introduction: "${intro},
    YOUR MAIN OBJECTIVE IS TO CREATE QUALITY CONTENT THAT WILL ENGAGE THE READER.
    your target audience for this is: "${target_audience}, 
    
    Make the introduction short and concise.
    YOUR MAIN OBJECTIVE IS TO CREATE QUALITY CONTENT THAT WILL ENGAGE THE READER.

    DON'T MENTION THE LIST OF SUBTITLE IN THE TEXT.
    Keep in mind that the mission is ${mission} and the context is "${context}".
    `,
  };
};
export const getConclusionPrompt = async (
  closure: string,
  mission: string,
  context: string,
  target_audience: string,
  subtitle: string[],
): Promise<{ system: string; user: string }> => {
  return {
    system: `Create conclusion with all the information you will be given, you're a professional on this context.
    You will receive the subtitle of the conclusion, the mission, the context and the target audience.

    You will use the context as instruction for the conclusion.
    Make sure the conclusion is related to the mission.


    You will also receive a list of subtitles of this article to help you create a logical conclusion with the rest of the article.
    The text output is destined to bring organic traffic to a website.
    Summarize the key points and encourage the reader to take action. 
    
    Make sure the conclusion is related to the mission of the article: "${mission}".

    The requirement are:
    - write a professional and engaging content
    - make it concise and informative,
    - if you have to explain a concept, make it clear and easy to understand
    
    The text will be read by busy people with short attention span.
    They value time efficiency, convenience. You should grab their attention as they have short attention spans.
    MAKE SURE TO CREATE A CALL TO ACTION.
    The call to action should be related to the mission.
    the call to action must be in a different paragraph, at last.
    THE CONCLUSION MUST BE AROUND THE MISSION AND THE context, WITHOUT MENTIONING THEM DIRECTLY.
    DON'T MENTION THE TARGET AUDIENCE IN THE TEXT, THIS IS ONLY TO GUIDE THE NARRATION."
    `,
    user: `Create a conclusion respecting the requirements for the conclusion: "${closure},
    your target audience for this is: "${target_audience},
    the mission is ${mission} and the context is ${context}.
    YOUR MAIN OBJECTIVE IS TO CREATE QUALITY CONTENT THAT WILL ENGAGE THE READER.

    PUT THE SUBTITLE OF THE CONCLUSION AS A TITLE.

    Make sure the conclusion is concise and short.
    Here's a list of the subtitle of this article to help you do logical transition between the content: ${subtitle}.

    The Call To Action must be in a different paragraph.
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
    system: `You will receive the body of an article, you will make logic transition between the content.
    
    You will make sure the language of the text is in ${lang}, even the subtitle.
    Make sure the information in a way that is easy to read and understand.
    Develop and explain each ideas, if it's not enough.

    You will make sure that the information of the text is display is various way.
    You will make sure that not all the information is display in the same way.
    Make sure bullet points are used in the text. Add them in a MAXIMUM of 2 or 3 SECTIONS.
    DON'T PUT TOO MUCH BULLET POINTS IN THE TEXT.
    Make sure that the text looks like a professional article made by a human.

    Make sure that the different section doesn't have the same structure, make sure that the different section don't look alike.

    You will need to separate the text in small paragraphs.
    `,
    user: `Here's the content of the body of the article: "${content}" and the multiple subtitles of the article: ${listOfSubtitles}.
    Your main job is to make sure the text is not redundant.
    MAKE SURE THERE IS NOT BULLET POINT IN EACH SECTION, IF THERE IS, REMOVE SOME.
    Develop the ideas, explain them, create a small introduction and conclusion for each paragraph if not already done.
    Use various way to display the information.
    Check the length of each paragraph, if one one is too long, split it.
    Separate the text in small paragraphs and make sure that the text is in ${lang}.
    You job is to find a way to make the text non redundant. 

    Include some bullet points in the text, but not at every paragraph.
    Each paragraph must have a different structure.

    YOUR MAIN OBJECTIVE IS TO CREATE QUALITY CONTENT THAT WILL ENGAGE THE READER.

    IMPORTANT MAKE SURE TO FOLLOW THE INSTRUCTION OF THE CONTEXT: "${context}"
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

    IMPORTANT: YOU NEED TO MAKE SURE THAT ALL THE TITLE AND SUBTITLE RESPECT THE REQUIREMENT PREVIOUSLY MENTIONED.
    IF (${lang} == "french" || ${lang} == "francais") {
      MAKE SURE THAT THE ONLY UPPERCASE LETTER IS THE FIRST LETTER OF THE SUBTITLE, FOR EACH ONES.
    }
    YOU STILL HAVE UPPERCASE LETTERS IN THE TITLES, MAKE SURE TO REMOVE THEM.
    Remove the "Introduction: " from the introduction title.


    - the conclusion subtitle should begin with "Conclusion: "
    - make sure to format it in html format.
    
    Here's a list of the subtitle of this article to help you do logical transition between the content: ${subtitleList} and to help you format the text in html format.

    make sure that all the text is in language: ${lang}, even the subtitle.
    IMPORTANT:
    - If the article use abbreviations, make sure to write the full word and the abbreviation in parenthesis.
    - make sure the title of the article is in h1 tag
    THE FIRST <P></P> MUST BE A SHORT INTRODUCTION OF THE ARTICLE. THIS SHOULD BE A MAXIMUM OF 2 SENTENCES.
    The first <p></p> should not have any <strong></strong>, <em></em>, <a></a> or any other html tags.

    `,
    user: `You will add the greatest title and add it in a h1 tag at the beginning of the article: "${greatestTitle}".
    IMPORTANT: YOU NEED TO MAKE SURE THAT ALL THE TITLE AND SUBTITLE RESPECT THE REQUIREMENT PREVIOUSLY MENTIONED.
    IF (${lang} == "french" || ${lang} == "francais") {
      MAKE SURE THAT THE ONLY UPPERCASE LETTER IS THE FIRST LETTER OF THE SUBTITLE, FOR EACH ONES. (Even the one in the h1 tag)
    }

    KEEP THE SAME CONCLUSION TITLLE.
    MAKE SURE THE CONCLUSION TITLE IS DIFFERENT OF "Conclusion: ".
        EACH SUBTITLE MUST BE IN A <H2> TAG.
    Edit this article: "${article} (Make sure all title begin by an uppercase letter).
    IMPORTANT: the text must be in ${lang}, if the text is not in ${lang}, you must translate it in ${lang} before improving it.
    make sure the mission is not mentioned literally in the test, it should be implicit, only to guide the narration.
    Make sure that each paragraph is separated by a <p></p> tag.
    Remove any markup that is not necessary for the article.
    Make sure that every FIRST LETTER of titles and subtitles of the article is uppercase.
    Make sur the title of the article is short and concise.

    IMPORTANT: MAKE SURE TO FOLLOW THE INSTRUCTION OF THE CONTEXT: "${context}"

    `,
  };
};

export const createGreatestTitleEverMadePrompt = async (
  article: string,
  lang: string,
  target_audience: string,
  context: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive an article, the target audience, and the context of the article.
    - The title MUST be written in ${lang}.

      Your task is to create the best possible title for this article.
      What makes a great title?
      The title should:
      - Be short and concise (no more than 8 words).
      - Clearly convey what the article is about without giving away too much.
      - Be highly engaging and draw the reader's attention.
      - MOST IMPORTANTLY, the title should contain keywords that the target audience would use to search for the article. It MUST BE SEO FRIENDLY.
    
      THE TITLE MUST BE SEO FRIENDLY AND INCLUDE KEYWORDS THAT THE TARGET AUDIENCE WOULD USE TO SEARCH FOR THE context.`,

    user: `CREATE THE BEST POSSIBLE TITLE:
    - The title should be no more than 8 words.
    - It must relate directly to the content of the article.
    - The title should be short, concise, and engaging.
    - Avoid using colons (:) or any special characters.
    - Do NOT mention the target audience directly in the title.
    - IF (${lang} == "french" || ${lang} == "francais") {
      ENSURE that only the first letter of the title is capitalized.
    }
    - The title MUST be written in ${lang}.
    YOU MUST USE CHOICE OF WORD THAT ARE NOT ALREADY IN THE ARTICLE AS SUBTITLE OR TITLE.

    THE TITLE MUST BE IN ${lang} AND SEO FRIENDLY.

    MAKE SURE THAT, IF THE TITLE IS IN ENGLISH, EVERY FIRST LETTER OF THE MAJOR ORD IS UPPERCASE.

    HERE'S THE CONTEXT OF THE ARTICLE, MAKE SURE TO FOLLOW THE INSTRUCTIONS: "${context}".
    
    Article: "${article}", target audience: "${target_audience}", and language: "${lang}".`,
  };
};

export const createDatasetContextPrompt = async (
  context: string,
  target_audience: string,
  mission: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive a context from which an article was created.
    You will return a prompt that will be used to create a dataset.
    You will return a PROMPT ith all the information needed to create a dataset.
    You will will determine what the dataset will be about given the context. 
    You will determine the information that will be in the dataset.
    You will also receive the target audience and the mission of the article.
    `,
    user: `Create a dataset asking prompt with the information you will be given.
    mission: "${mission}",
    target audience: "${target_audience}",
    context: "${context}".
    `,
  };
};

export const createDatasetPrompt = async (
  prompt: string,
  target_audience: string,
  mission: string,
  lang: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive a prompt, mission and target_audience.
    You will make sure the language of the dataset is in ${lang}.
    You will return a dataset for Chart.js.
    Remove all // comments from the dataset.

    give me a maximum of 5 fields for the dataset.

    donne moi un jeu de donnée pour faire une représentation graphique intéressante,
    donc je veux un object JSON avec 2 fields, 'data' et labels',
    ce jeu de donnée devrait être assez grand pour être pertinent et avoir un attrait intéressant pour le sujet donnée 

    this is an exemple of dataset you must return: {
      type: 'pie',
      data: {
        labels: ['Blog Posts', 'Ebooks', 'Webinars', 'Infographics', 'Whitepapers'],
        datasets: [
          {
            label: 'Usage (%)',
            data: [85, 65, 55, 50, 40],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 205, 86, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Usage of Content Types',
          },
        },
      },
    };
    
    `,
    user: `Create a dataset with the following information:

    mission: "${mission}",
    target audience: "${target_audience}",
    prompt: "${prompt}".
    `,
  };
};
