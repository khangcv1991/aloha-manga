import React from 'react';
import styles from './chapterDetail.module.scss';

export const ChapterDetail = (props: { imgLinks: string[] }): JSX.Element => {
  const { imgLinks } = props;
  return (
    <>
      <div className={styles.chapterContainer}>
        {imgLinks?.map((imgLink) => (
          <img src={imgLink} className={styles.imgContainer} />
        ))}
      </div>
    </>
  );
};
