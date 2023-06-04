import { Manga, MangaFilter } from '@shared/types/Manga';
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { apiRequest } from './api-request';
import { keyBy } from 'lodash';
import { getLocalStorageItem, setLocalStorageItem } from './localstorage.util';

export enum PAGE_STAGE {
  HOME = 'home',
  MANGA_DETAIL = 'manga detail',
  CHAPTER_DETAIL = 'chapter detail',
}
interface PageContextProps {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
  mangas: Manga[];
  setMangas: Dispatch<SetStateAction<Manga[]>>;
  mangaByMangaId: Record<string, Manga>;
  mangaIdsByCategory: Record<string, string[]>;
  categories: string[];
  readingManga: string;
  readingChapter: string;
  setReadingManga: Dispatch<SetStateAction<string>>;
  setReadingChapter: Dispatch<SetStateAction<string>>;
  mangaFilter: MangaFilter;
  setMangaFilter: Dispatch<SetStateAction<MangaFilter>>;
  filteringMangas: Manga[];
  isMangaListLoading: boolean;
  pageStage: string;
  setPageStage: Dispatch<SetStateAction<string>>;
}

export const PageContext = createContext<PageContextProps>({
  isDarkMode: false,
  setIsDarkMode: undefined,
  mangas: [],
  setMangas: undefined,
  mangaByMangaId: undefined,
  mangaIdsByCategory: undefined,
  categories: undefined,
  readingManga: undefined,
  readingChapter: undefined,
  setReadingChapter: undefined,
  setReadingManga: undefined,
  mangaFilter: undefined,
  setMangaFilter: undefined,
  filteringMangas: undefined,
  isMangaListLoading: true,
  pageStage: undefined,
  setPageStage: undefined,
});

export const PageProvider = (props: {
  children?: React.ReactNode;
}): JSX.Element => {
  const { children } = props;
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    getLocalStorageItem('isDarkMode'),
  );
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [readingManga, setReadingManga] = useState<string>(
    getLocalStorageItem('readingManga'),
  );
  const [readingChapter, setReadingChapter] = useState<string>(
    getLocalStorageItem('readingChapter'),
  );
  const [mangaFilter, setMangaFilter] = useState<MangaFilter>({
    categories: [],
    searchName: undefined,
  });
  const [isMangaListLoading, setIsMangaListLoading] = useState(true);
  const [pageStage, setPageStage] = useState(PAGE_STAGE.HOME);

  const mangaByMangaId = useMemo(() => keyBy(mangas, 'mangaId'), [mangas]);
  const mangaIdsByCategory = useMemo(
    () =>
      mangas.reduce((currAcc, currVal: Manga) => {
        let tmpAcc = { ...currAcc };
        for (let category of currVal.categories) {
          const tmpList = tmpAcc[category] || [];
          tmpList.push(currVal.mangaId);
          tmpAcc[category] = tmpList;
        }
        return tmpAcc;
      }, {}),
    [mangas],
  );

  const categories = useMemo(
    () => Object.keys(mangaIdsByCategory || {}),
    [mangaIdsByCategory],
  );

  const filteringMangas = useMemo(() => {
    console.log(mangaFilter);
    if (mangaFilter && mangaFilter.searchName?.trim().length > 0) {
      return mangas.filter((manga) => {
        if (!manga.title) {
          return false;
        }
        return manga.title
          ?.toLowerCase()
          ?.includes(mangaFilter.searchName?.toLocaleLowerCase());
        // const itemWords = manga.title.split(' ');
        // console.log(manga.title);
        // const wordList = mangaFilter.searchName.split(' ');
        // return !!itemWords?.some((word) => wordList.includes(word));
      });
    }

    if (
      mangaFilter &&
      mangaFilter.categories.length > 0 &&
      mangaFilter.categories[0] !== '' &&
      mangaFilter.categories[0] !== 'all'
    ) {
      return mangaIdsByCategory?.[mangaFilter.categories[0]]?.map(
        (id: string) => mangaByMangaId?.[id],
      );
    }

    return mangas;
  }, [mangaFilter, mangas]);

  useEffect(() => {
    void (async () => {
      try {
        setIsMangaListLoading(true);

        const mangaResponse = await apiRequest<Manga[]>({
          method: 'GET',
          url: '/client/manga/list',
        });

        if ('data' in mangaResponse) {
          setMangas(mangaResponse.data || []);
        }
        setIsMangaListLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    setLocalStorageItem('readingManga', readingManga);
  }, [readingManga]);

  useEffect(() => {
    setLocalStorageItem('readingChapter', readingChapter);
  }, [readingChapter]);

  const pageProviderValues = {
    isDarkMode,
    setIsDarkMode,
    mangas,
    setMangas,
    mangaByMangaId,
    mangaIdsByCategory,
    categories,
    readingChapter,
    readingManga,
    setReadingChapter,
    setReadingManga,
    mangaFilter,
    setMangaFilter,
    filteringMangas,
    isMangaListLoading,
    pageStage,
    setPageStage,
  };

  return (
    <PageContext.Provider value={pageProviderValues}>
      {children}
    </PageContext.Provider>
  );
};

export function containsWords(string: string, words: string[]) {
  if (!words) {
    return true;
  }

  if (words.length == 1) {
    return string?.includes(words[0]);
  }

  const pattern = new RegExp(`\\b(${words.join('|')})\\b`, 'i');
  return pattern.test(string);
}
