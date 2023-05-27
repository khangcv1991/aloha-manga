import { MangaFilter } from '@shared/types/Manga';

export function convertFilterStringToObject(filterString: string) {
  const filterObj: MangaFilter = {};

  if (!filterString) {
    return undefined;
  }
  // Split the filter string by '&' to get individual filter conditions
  const filterConditions = filterString.split('&');

  // Iterate over each filter condition and extract key-value pairs
  filterConditions.forEach((condition) => {
    const [key, value] = condition.split('=');

    if (key && value) {
      // Assign key-value pairs to the filter object
      if (key === 'searchName') {
        filterObj.searchName = decodeURIComponent(value);
      } else if (key === 'categories') {
        filterObj.categories = value
          .split(',')
          .map((category) => decodeURIComponent(category));
      } else if (key === 'authors') {
        filterObj.authors = value
          .split(',')
          .map((author) => decodeURIComponent(author));
      }
    }
  });

  return filterObj;
}

export function containsWords(string: string, words: string[]) {
  const pattern = new RegExp(`\\b(${words.join('|')})\\b`, 'i');
  return pattern.test(string);
}
