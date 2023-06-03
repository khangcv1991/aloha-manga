import React, { useContext } from 'react';
import styles from './mangaList.module.scss';
import MangaItem from './mangaItem/MangaItem';
import { Manga } from '@shared/types/Manga';
import { PageContext } from '../../utils/PageContext';

interface MangaListProps {
  mangas: Manga[];
  className?: string;
}

const MangaList = (props: MangaListProps) => {
  const { mangas, className } = props;
  const { isMangaListLoading } = useContext(PageContext);
  return (
    <>
      <div className={`${styles.mangaListContainer} ${className}`}>
        {isMangaListLoading
          ? Array(20)
              .fill({ isLoading: true })
              .map((manga) => (
                <MangaItem
                  key={manga.mangaId}
                  manga={manga}
                  isLoading={isMangaListLoading}
                />
              ))
          : mangas?.map((manga) => (
              <MangaItem
                key={manga.mangaId}
                manga={manga}
                isLoading={isMangaListLoading}
              />
            ))}
      </div>
    </>
  );
};

export default MangaList;
