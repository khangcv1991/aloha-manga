export function containsWords(string: string, words: string[]) {
  const pattern = new RegExp(`\\b(${words.join('|')})\\b`, 'i');
  return pattern.test(string);
}
