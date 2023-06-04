import React, { useEffect, useRef } from 'react';
import styles from './chapterDetail.module.scss';
import ImageLoader from '../../../components/ImageLoader/ImageLoader';

export const ChapterDetail = (props: { imgLinks: string[] }): JSX.Element => {
  const { imgLinks } = props;
  const chapterContainerRef = useRef(null);

  useEffect(() => {
    if (chapterContainerRef?.current) {
      chapterContainerRef.current.scrollTop = 0;
    }
  }, [imgLinks]);

  return (
    <>
      <div className={styles.chapterContainer} ref={chapterContainerRef}>
        {imgLinks?.map((imgLink) => (
          // <img src={imgLink} className={styles.imgContainer} />
          <ImageLoader src={imgLink} className={styles.imgContainer} />
        ))}
      </div>
    </>
  );
};
