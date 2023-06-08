export const getMangaNameFromChapter = (chapterName: string) => {
  if (!chapterName) {
    return null;
  }

  const regex = /-chapter-\d+-ch\d+/;
  return chapterName.replace(regex, '');
};
