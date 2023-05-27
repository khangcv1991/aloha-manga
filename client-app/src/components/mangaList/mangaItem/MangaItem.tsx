import React, { useContext } from 'react';
import styles from './manga.module.scss';
import clockIconImage from './clock_icon.png';
import { Manga } from '@shared/types/Manga';
import { useNavigate } from 'react-router-dom';
import { pageContext } from '../../../utils/PageContext';

const MangaItem = (props: { manga: Manga }) => {
  const { manga } = props;
  const { setReadingManga } = useContext(pageContext);
  const navigate = useNavigate();

  return (
    <div
      className={styles.container}
      key={manga.mangaId}
      onClick={() => {
        navigate(`/manga/${manga.mangaId}`);
        setReadingManga(manga.mangaId);
      }}
    >
      <div
        className={styles.mangaContainer}
        style={{
          backgroundImage: `url(${manga.imageLink})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className={styles.rowRight}>
          <h6 className={styles.mangaChapter}>
            Chapter {manga.chapterLinks.length || 0}
          </h6>
        </div>
        <div className={styles.rowLeft}>
          {manga.categories?.slice(0, 3).map((category) => (
            <h6 className={styles.mangaCategory}>{category}</h6>
          ))}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.mangaTitle}>
          <h4>{manga.title}</h4>
        </div>
        <div className={styles.col}>
          <div className={styles.mangaTime}>
            <img src={clockIconImage} width={20} height={20} />
            <h5>45 Minutes Ago</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaItem;
