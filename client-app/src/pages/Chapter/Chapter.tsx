import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiRequest } from '../../utils/api-request';
import { Chapter } from '@shared/types/Chapter';
import styles from './chapter.module.scss';
import { ChapterNav } from './ChapterNav/ChapterNav';
import { PAGE_STAGE, PageContext } from '../../utils/PageContext';
import Page from '../../components/page/Page';
import { ChapterDetail } from './chapterDetail/ChapterDetail';

export const ChapterPage = (): JSX.Element => {
  const { chapterId } = useParams();
  const { setReadingChapter, setPageStage } = useContext(PageContext);
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

    setPageStage(PAGE_STAGE.CHAPTER_DETAIL);
  }, [chapterId]);

  return (
    <>
      <Page title="Chapter">
        <div className={styles.chapterContainer}>
          <ChapterDetail imgLinks={images} />
        </div>
      </Page>
    </>
  );
};
