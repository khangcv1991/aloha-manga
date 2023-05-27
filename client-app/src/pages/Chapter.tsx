import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiRequest } from '../utils/api-request';
import { Chapter } from '@shared/types/Chapter';
import { ChapterDetail } from '../components/ChapterDetail/ChapterDetail';

export const ChapterPage = (): JSX.Element => {
  const { chapterId } = useParams();
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
          console.log(chapterResponse.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(images);
  return (
    <>
      <ChapterDetail imgLinks={images} />
    </>
  );
};
