import { Locale, localesDetails } from '../../types/languages';
import { preprocessJSON } from '../preprocessJSON';
import { createDataset } from './create-dataset';
import { createDatasetContext } from './create-dataset-context';

export const getDataset = async ({
  context,
  mission,
  target_audience,
  lang,
}: {
  context: string;
  mission: string;
  target_audience: string;
  lang: Locale;
}) => {
  const language = localesDetails[lang].language;
  const prompt = await createDatasetContext(context, mission, target_audience);
  const dataset = await createDataset(prompt, mission, target_audience, language);

  return preprocessJSON(dataset).replace('const dataset: ChartProps = ', '').replaceAll(';', '');
};
