import React from 'react';
import styles from './mangaList.module.scss';
import MangaItem from './mangaItem/MangaItem';
import { Manga } from '@shared/types/Manga';

interface MangaListProps {
  mangas: Manga[];
}

const MangaList = (props: MangaListProps) => {
  const { mangas } = props;

  return (
    <>
      <div className={styles.mangaListContainer}>
        {mangas.map((manga) => (
          <MangaItem manga={manga} />
        ))}
      </div>
    </>
  );
};

export default MangaList;
