import { LocaleDetails } from '../types/languages';

export const createDatasetPrompt = async (
  context: string,
  locale: LocaleDetails,
  type?: 'bar' | 'pie',
): Promise<{ system: string; user: string }> => {
  return {
    system: `For an article for the context.
      You will follow the specific instruction given by the user.

      Try to compare 2 elements together in the dataset.
      Use these 2 elements to create a comparison and contrast between 2 ideas.
      Use these 2 elements to illustrate a point or a concept.
      The chart must be easy to understand and visually appealing, therefore the dataset should be simple and meaningful.
      If the data is a percentage, make sure this is clear that it is a percentage.

      Expected JSON output type:
      {
        type: 'bar' | 'pie';
        source: string;//legitimate source
        data: {
          labels: string[];
          datasets: {
            label: string; // Explain what the data represents (e.g., 'Number of products')
            data: number[];
          }[];
        };
        options: {
          responsive: true;
          plugins: {
            legend: {
              display: boolean;
              position: 'top' | 'left' | 'bottom' | 'right';
            };
            title: {
              display: true;
              text: string;
            };
          };
          scales?: {
            y: {
              beginAtZero: true; //for bar chart only
              max: number; //for bar chart only, max value of y-axis
            };
          };
        };
      }; 
      `,
    user: `Please provide a JSON following the given type structure. The dataset should be meaningful and simple enough to be visually compelling. Ensure that the dataset is relevant to the subject and interesting to engage the audience. Choose the most appropriate type of chart for the data.
    Return the JSON object only, no comment, no explanation.
    The context is: ${context}.
    You will make sure the language of the dataset is in ${locale.language}.
    You need to create a dataset for a chart ${type ? `of type ${type}` : 'with a type of bar or pie'}.`,
  };
};

export const addChartToArticlePrompt = async (content: string, dataset: string): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive an article about and a dataset for a chart.
    Yo will only get the label of the chart and the title of it.
    You need to understand what to graph is about and choose the most appropriate placement to it in the article.
    At the place where you think the chart should be, add the following HTML code: <div id="chart"></div> in the article content.
    You will return all the article with the div added.
    Wou will add it in the middle of the article, where it makes sense.
    NOT AT THE END OF THE ARTICLE.
    ${dataset}
    `,
    user: `You will add <div id="chart"></div> at the right place in the article. Here's the dataset: ${dataset} and the article: ${content}`,
  };
};

export const editDatasetPrompt = async (
  dataset: string,
  article: string,
  lang: LocaleDetails,
): Promise<{ system: string; user: string }> => {
  return {
    system: `You will receive a dataset for a chart.
    You will also received a article, which the database is related to for context.
    -You will change the title for one { THAT REPRESENTS ALL THE DATA IN THE DATASET }.
    - Make sure the data is in the language ${lang.language}.
    - MAKE SURE THE TITLE IS NOT ALREADY PRESENT AS IN THE ARTICLE.
    TITLE MUST NOT HAVE ANY ":".
    You will improve the title of the chart and the labels of the dataset, to reflect the data in a more meaningful way.
    
    DON'T USE ANY TITLE OR LABEL FOR THE ARTICLE, ONLY USE THE DATASET TO MAKE A RELEVANT TITLE AND LABELS.

    You will find a relevant source for the data and add it to the dataset.
    Source must be a reliable source, like a scientific paper, a government report, or a news article.
    Source must relate to the data in the dataset.
    Source must be in APA format, don't mention any url.

    Expected JSON output type:
      {
        type: 'bar' | 'pie';
        source: string;//legitimate source
        data: {
          labels: string[];
          datasets: {
            label: string; // Explain what the data represents (e.g., 'Number of products')
            data: number[];
          }[];
        };
        options: {
          responsive: true;
          plugins: {
            legend: {
              display: boolean;
              position: 'top' | 'left' | 'bottom' | 'right';
            };
            title: {
              display: true;
              text: string;
            };
          };
          scales?: {
            y: {
              beginAtZero: true; //for bar chart only
              max: number; //for bar chart only, max value of y-axis
            };
          };
        };
      }; 
    `,
    user: `Here's the dataset: ${dataset} and the article: ${article}`,
  };
};
