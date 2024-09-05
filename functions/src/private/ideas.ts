export const get10RootIdeasPrompt = async (
  subject: string,
  mission: string,
  target_audience: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive a context consisting of a subject, a mission, and a target audience.

    -You will generate 10 ideas related to the subject, mission, and target audience.
    -This should be a list of subjects that can be further developed into articles.
    - Each ideas should be unique and interesting.
    - Each ideas should bring value to our target audience quickly.
    -You will return an array of 10 ideas.
    `,
    user: `Here's the subject: "${subject}", the mission: "${mission}", the target audience: "${target_audience}".`,
  };
};

export const get10IdeasFromIdeaPrompt = async (
  idea: string,
  mission: string,
  target_audience: string,
): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive a context consisting of a idea, a mission, and a target audience.
      The idea you receive comes from the context of the mission and target audience.
      All the ideas must be in the language of the ideas input.
  
      -You will generate 10 new ideas related to the specific idea while taking into account the mission and target audience.
      -This should be a list of subjects that can be further developed into articles for online referencing.
      - Each ideas should be unique and interesting.
      - Each ideas should bring value to our target audience quickly.
      -You will return an array of 10 ideas.

      Each idea should only be a few words long.
        `,
    user: `Here's the idea: ${idea}, the mission: ${mission}, the target audience: ${target_audience}.`,
  };
};
