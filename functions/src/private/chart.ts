import { LocaleDetails } from '../types/languages';

export const createDatasetPrompt = async (
  context: string,
  locale: LocaleDetails,
  type?: 'bar' | 'pie',
): Promise<{ system: string; user: string }> => {
  return {
    system: `For an article about "${context}", you need to create a dataset for a chart ${type ? `of type ${type}` : 'with a type of bar or pie'}.
      You will make sure the language of the dataset is in ${locale.language}.

      Expected output type:
      {
        type: 'bar' | 'pie';
        data: {
            labels: string[];
            datasets: {
            label: string;
            data: number[];
            backgroundColor: string | string[]; // string when bar chart, string[] when pie chart
            borderColor: string | string[]; // string when bar chart, string[] when pie chart
            borderWidth: number;
            }[];
        };
        options: {
            responsive: true;
            plugins: {
            legend: {
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
            };
            };
        };
        }  
      `,
    user: `Please provide a JSON following the given type structure. The dataset should be meaningful and simple enough to be visually compelling. Ensure that the dataset is relevant to the subject and interesting to engage the audience. Choose the most appropriate type of chart for the data.
    Return the JSON object only, no comment, no explanation.`,
  };
};
