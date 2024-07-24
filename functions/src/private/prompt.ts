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

export const getContentForSubtitlePrompt = async (subtitle: string): Promise<{ system: string; user: string }> => {
  return {
    system: `Create content for the subtitle "${subtitle}", the requirement are:
    - Keep it short and easy to process for a human reader
    -make it concise and informative`,
    user: `Create content for the subtitle ${subtitle}`,
  };
};
