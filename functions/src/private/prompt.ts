export const getListOfSubjectSecretPrompt = async (subject: string): Promise<{ system: string; user: string }> => {
  return {
    system: `Split this subject titled "${subject}" into sub-title for an article, the requirement are:
    -Result must be in JSON READABLE format
- Keep it short and easy to process
- if the title include a number of points to develop, explore them and and always add a bonus +1 item marked as "(bonus)"
- Always add an adapted introduction and closure but you could present it as fitted for the subject
-introduction and closure must be in the list of subtitles
-only return a list of content, nothing else
- Simply output a JavaScript-like list of sub-title"`,
    user: `Accomplish the task by providing a list of sub-title for an article "${subject}"`,
  };
};

export const getContentForSubtitlePrompt = async (
  subtitle: string,
  mission: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `Create few paragraph WITHOUT introduction OR conclusion for the subtitle: "${subtitle}" and the mission: "${mission}", the requirement are:
    -use html tags to format the text
    - write a professional and engaging content
    - make it concise and informative,
    - if you have to make a list, make it clear and easy to read
    - if you have to explain a concept, make it clear and easy to understand`,
    user: `Create content for the subtitle ${subtitle}`,
  };
};

export const getContentForIntroPrompt = async (intro: string, mission: string): Promise<{ system: string; user: string }> => {
  return {
    system: `Create introduction for the intro: "${intro}" and the mission: "${mission}", the requirement are:
    -use html tags to format the text
    - write a professional and engaging content
    - make it concise and informative,
    - if you have to make a list, make it clear and easy to read
    - if you have to explain a concept, make it clear and easy to understand`,
    user: `Create content for the subtitle ${intro}`,
  };
};
export const getContentForClosurePrompt = async (closure: string, mission: string): Promise<{ system: string; user: string }> => {
  return {
    system: `Create conclusion for the subtitle: "${closure}" and the mission: "${mission}",, the requirement are:
    -use html tags to make the content looks like a closure
    - write a professional and engaging content
    - make it concise and informative,
    - if you have to make a list, make it clear and easy to read
    - if you have to explain a concept, make it clear and easy to understand`,
    user: `Create content for the subtitle ${closure}`,
  };
};

export const improveDraftPrompt = async (draft: string, mission: string): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive a draft of an article, you will improve it, better it, make it coherent betweens parts. Here is the draft: "${draft}" and the mission: "${mission}",, the requirement are:
    - write a professional and engaging content
    -use no special caracters like "#" or "*" or any other markdown
    -delete all special caracters like "#" or "*" or any other markdown
    -write the article a way a user would expect it to looks like on a website
    - make it concise and informative,
    - if you have to make a list, make it clear and easy to read
    - if you have to explain a concept, make it clear and easy to understand`,
    user: `Improve this draft: ${draft}`,
  };
};
