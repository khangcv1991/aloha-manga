export interface Manga {
  mangaLink: string;
  mangaId: string;
  title: string;
  author: string;
  description: string;
  categories: string[];
  chapterLinks: string[];
  imageLink: string;
}

export interface MangaFilter {
  searchName?: string;
  categories?: string[];
  authors?: string[];
}
