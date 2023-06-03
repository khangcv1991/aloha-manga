import React from 'react';
import styles from './mangaList.module.scss';
import MangaItem from './mangaItem/MangaItem';
import { Manga } from '@shared/types/Manga';

interface MangaListProps {
  mangas: Manga[];
  className?: string;
}

const MangaList = (props: MangaListProps) => {
  const { mangas, className } = props;

  return (
    <>
      <div className={`${styles.mangaListContainer} ${className}`}>
        {mangas?.map((manga) => (
          <MangaItem key={manga.mangaId} manga={manga} />
        ))}
      </div>
    </>
  );
};

export default MangaList;
