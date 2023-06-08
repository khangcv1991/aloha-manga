import { Manga, MangaFilter, MangaHistory } from '@shared/types/Manga';
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { apiRequest } from './api-request';
import { keyBy, uniqBy } from 'lodash';
import { getLocalStorageItem, setLocalStorageItem } from './localstorage.util';
import { ChapterHistory } from '@shared/types/Chapter';
import { getMangaNameFromChapter } from './manga.util';

export enum PAGE_STAGE {
  HOME = 'home',
  FAVORIT = 'favorit',
  HISTORY = 'history',
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
  mangaHistory: Record<string, string[]>;
  setMangaHistory: Dispatch<SetStateAction<Record<string, string[]>>>;
  mangaFavorit: MangaHistory[];
  setMangaFavorit: Dispatch<SetStateAction<MangaHistory[]>>;
  // clientDevice: string;
  // setClientDevice: Dispatch<SetStateAction<string>>;
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
  mangaHistory: undefined,
  setMangaHistory: undefined,
  mangaFavorit: undefined,
  setMangaFavorit: undefined,
  // clientDevice: undefined,
  // setClientDevice: undefined,
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
  const [pageStage, setPageStage] = useState<string>(
    getLocalStorageItem('pageStage'),
  );
  const [mangaHistory, setMangaHistory] = useState(
    getLocalStorageItem<Record<string, string[]>>('mangaHistory') || {},
  );
  const [mangaFavorit, setMangaFavorit] = useState(
    getLocalStorageItem<MangaHistory[]>('mangaFavorit'),
  );
  // const [clientDevice, setClientDevice] = useState();

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
    switch (pageStage) {
      case PAGE_STAGE.HOME:
        if (mangaFilter && mangaFilter.searchName?.trim().length > 0) {
          return mangas.filter((manga) => {
            if (!manga.title) {
              return false;
            }
            return manga.title
              ?.toLowerCase()
              ?.includes(mangaFilter.searchName?.toLocaleLowerCase());
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
      case PAGE_STAGE.FAVORIT:
        const list = mangaFavorit.map((item) => mangaByMangaId?.[item.mangaId]);
        if (mangaFilter && mangaFilter.searchName?.trim().length > 0) {
          return list.filter((manga) => {
            if (!manga.title) {
              return false;
            }
            return manga.title
              ?.toLowerCase()
              ?.includes(mangaFilter.searchName?.toLocaleLowerCase());
          });
        }

        if (
          mangaFilter &&
          mangaFilter.categories.length > 0 &&
          mangaFilter.categories[0] !== '' &&
          mangaFilter.categories[0] !== 'all'
        ) {
          const mangaFavoritbyMangaId = keyBy(mangaFavorit, 'mangaId');
          return mangaIdsByCategory?.[mangaFilter.categories[0]]
            ?.filter((item) => mangaFavoritbyMangaId?.[item])
            .map((id: string) => mangaByMangaId?.[id]);
        }

        return list;
    }
  }, [mangaFilter, mangas, pageStage]);

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

  useEffect(() => {
    if (pageStage === PAGE_STAGE.CHAPTER_DETAIL && readingChapter) {
      const mangaId = getMangaNameFromChapter(readingChapter);
      const tmpList = mangaHistory[mangaId] || [];
      if (!tmpList.includes(readingChapter)) {
        tmpList.push(readingChapter);
      }

      const updatedMangaHistory = { ...mangaHistory, [mangaId]: tmpList };
      setMangaHistory(updatedMangaHistory);

      setLocalStorageItem('mangaHistory', updatedMangaHistory);
    }
  }, [pageStage, readingManga]);

  useEffect(() => {
    const uniqMangaList = uniqBy(mangaFavorit, 'mangaId');
    setLocalStorageItem('mangaFavorit', uniqMangaList);
  }, [mangaFavorit]);

  useEffect(() => {
    setMangaFilter({ categories: [], searchName: undefined });
    setLocalStorageItem('pageStage', pageStage);
  }, [pageStage]);

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
    mangaHistory,
    setMangaHistory,
    mangaFavorit,
    setMangaFavorit,
    // clientDevice,
    // setClientDevice,
  };

  return (
    <PageContext.Provider value={pageProviderValues}>
      {children}
    </PageContext.Provider>
  );
};
