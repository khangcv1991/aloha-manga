import React, { useContext, useEffect, useState } from 'react';
import { PageContext } from '../../../utils/PageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styles from './favoritButton.module.scss';

export const FavoritButton = () => {
  const { mangaFavorit, setMangaFavorit, readingManga } =
    useContext(PageContext);
  const [isFavorit, setIsFavorit] = useState(false);
  useEffect(() => {
    const manga = mangaFavorit?.find((item) => item.mangaId === readingManga);
    if (manga) {
      setIsFavorit(true);
    }
  }, []);

  return (
    <>
      <div className={styles.favoritButtonContainer}>
        <FontAwesomeIcon
          icon={faStar}
          className={isFavorit ? styles.favoritItem : styles.item}
          size="2xl"
          onClick={() => {
            if (isFavorit) {
              const filtedList = mangaFavorit.filter(
                (item) => item.mangaId !== readingManga,
              );
              setMangaFavorit(filtedList);
              setIsFavorit(false);
            } else {
              setMangaFavorit([
                ...(mangaFavorit || []),
                { mangaId: readingManga, createdAt: new Date().toISOString() },
              ]);
              setIsFavorit(true);
            }
          }}
        />
      </div>
    </>
  );
};
