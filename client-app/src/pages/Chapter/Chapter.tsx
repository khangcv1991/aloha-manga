import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiRequest } from '../../utils/api-request';
import { Chapter } from '@shared/types/Chapter';
import styles from './chapter.module.scss';
import { ChapterNav } from './ChapterNav/ChapterNav';
import { PageContext } from '../../utils/PageContext';
import { ChapterDetail } from '../../components/ChapterDetail/ChapterDetail';

export const ChapterPage = (): JSX.Element => {
  const { chapterId } = useParams();
  const { setReadingChapter } = useContext(PageContext);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    void (async () => {
      try {
        const chapterResponse = await apiRequest<Chapter>({
          method: 'GET',
          url: `/client/chapter/${chapterId}`,
        });
        if ('data' in chapterResponse) {
          setImages(chapterResponse.data?.originalImageLinks || []);
        }

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      } catch (error) {
        console.log(error);
      }
    })();

    if (chapterId && setReadingChapter) {
      setReadingChapter(chapterId);
    }
  }, [chapterId]);

  return (
    <>
      <div className={styles.chapterContainer}>
        <ChapterDetail imgLinks={images} />
        <ChapterNav />
      </div>
    </>
  );
};
