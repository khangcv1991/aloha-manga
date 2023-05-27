import { Manga } from '@shared/types/Manga';
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
}

export const pageContext = createContext<PageContextProps>({
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
});

export const PageProvider = (props: {
  children?: React.ReactNode;
}): JSX.Element => {
  const { children } = props;
  const [isDarkMode, setIsDarkMode] = useState<boolean>();
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [readingManga, setReadingManga] = useState<string>();
  const [readingChapter, setReadingChapter] = useState<string>();

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

  useEffect(() => {
    void (async () => {
      try {
        const mangaResponse = await apiRequest<Manga[]>({
          method: 'GET',
          url: '/client/manga/list',
        });

        if ('data' in mangaResponse) {
          setMangas(mangaResponse.data || []);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

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
  };

  return (
    <pageContext.Provider value={pageProviderValues}>
      {children}
    </pageContext.Provider>
  );
};
