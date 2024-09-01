export const convertTitleToID = (title: string): string => {
  // Convert title to lowercase
  let id = title.toLowerCase();

  // Replace accents with their non-accented versions
  id = id.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Replace spaces and special characters with dashes
  id = id.replace(/[\s\W-]+/g, '-');

  // Remove leading or trailing dashes
  id = id.replace(/^-+|-+$/g, '');

  return id;
};
