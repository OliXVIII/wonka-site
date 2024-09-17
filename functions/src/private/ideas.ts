export const get10RootIdeasPrompt = async (
  mission: string,
  targetAudience: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive a context consisting of a subject, a mission, and a target audience.

    Important: the result should be display in a way that can be used in a JSON.parse() function.
    - You will generate 10 ideas related to the subject, mission, and target audience.
    - This should be a list of subjects that can be further developed into articles.
    - The ideas should be unique and interesting.
    - The ideas should be in the language provided in the subject.
    - You will return an array of 10 ideas.
    - The mission should no be mentioned, it should only be used to guide the nature of the ideas.
    - The idea should have a wider scope than the subject.
    - Use different theme for each idea.
    `,
    user: `Here's the mission: "${mission}", the target audience: "${targetAudience}".
    Important: the result should be display in a way that can be used in a JSON.parse() function.`,
  };
};

export const get10IdeasFromIdeaPrompt = async (
  idea: string,
  mission: string,
  targetAudience: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive a context consisting of a idea, a mission, and a target audience.
      The idea you receive comes from the context of the mission and target audience.
      All the ideas must be in the language of the ideas input.
  
      - You will generate 10 new ideas related to the specific idea while taking into account the mission and target audience.
      - This should be a list of subjects that can be further developed into articles for online referencing.
      - The ideas should be unique and interesting.
      - The ideas should be in the language provided.
      - You will return an array of 10 ideas.
      - Each idea should engage the target audience.
      - The mission should no be mentioned, it should only be used to guide the nature of the ideas.
      - The idea should have a wider scope than the idea.



      Each idea should only be a few words long.
        `,
    user: `Here's the idea: ${idea}, the mission: ${mission}, the target audience: ${targetAudience}.`,
  };
};

export const getNextArticleIdeasPrompt = async (
  ideas: string[],
  mission: string,
  targetAudience: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive a list of ideas, a mission, and a target audience.
      You will receive a list of 100 ideas, you will pick the 7 best ideas for the user to pick from.

      The first idea should be the best one, the second idea should be the second best one, and so on.
      Result should only be a list[] of 7 ideas.
      Result must be type string[].
      
      Here's what's make a good idea:
      - Pick ideas the company would be advantageous to create content around.
      - The idea should be interesting enough to create content around it.
      - The idea should reflect the mission and target audience.
      - The idea should engage the target audience.
      - The mission should no be mentioned, it should only be used to guide the nature of the ideas.

    `,
    user: `Here's the mission: ${mission}, the target audience: ${targetAudience} and the list of 100 ideas: ${ideas}.`,
  };
};
