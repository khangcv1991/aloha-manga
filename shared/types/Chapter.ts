export interface Chapter {
  chapterLink: string;
  chapterId: string;
  originalImageLinks: string[];
  imageLinks?: string[];
  isDownload: boolean;
}

export interface ChapterHistory {
  chapterId: string;
  createdAt: string;
}
