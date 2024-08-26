export function extractLabelAndTitleFromString(chartString: string) {
  // Parse the string into a JavaScript object
  const chart = JSON.parse(chartString);

  // Extract the label and title
  const label = chart.data.datasets[0]?.label || '';
  const title = chart.options.plugins.title?.text || '';

  // Return the result in the desired format
  return JSON.stringify({ label, title });
}
