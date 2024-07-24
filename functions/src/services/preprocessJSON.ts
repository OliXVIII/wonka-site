export const preprocessJSON = (jsonString: string) => {
  const regex = /\}\s*\{/g;

  return jsonString
    .replace(/json\n?/, '')
    .replace(/jsx\n?/, '')
    .replace(/javascript\n?/, '')
    .replaceAll('```', '')
    .replace(/,\s*}/g, '}')
    .replace(/,\s*]/g, ']')
    .replace(/,\s*([\]}])/g, '$1')
    .replace(regex, '}, {');
};
