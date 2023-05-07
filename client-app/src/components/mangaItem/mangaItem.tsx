import React from 'react';
import { Category } from '../navbar/CategoryFilter/CategoryFilter';
import styles from './manga.module.scss';
import clockIconImage from './clock_icon.png';

export interface Manga {
  mangaId: string;
  title: string;
  imgUrl: string;
  categories: Category;
  updatedDate: string;
}

const mangaItem = (props: Manga) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.mangaContainer}
        style={{
          backgroundImage: `url(https://img.freepik.com/premium-photo/anime-girl-watching-sunset-3d-illustration_717906-1417.jpg?w=2000)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className={styles.rowRight}>
          <h6 className={styles.mangaChapter}>Chapter 10</h6>
        </div>
        <div className={styles.rowLeft}>
          <h6 className={styles.mangaCategory}>Manhwa</h6>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.mangaTitle}>
          <h4>Secret class</h4>
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

export default mangaItem;
