import React from 'react';
import styles from './chapterList.module.scss';
import { useNavigate } from 'react-router-dom';

interface ChapterListProps {
  chapterLinks: string[];
}
export const ChapterList = (props: ChapterListProps): JSX.Element => {
  const { chapterLinks } = props;
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.chapterContainer}>
        {chapterLinks?.map((chapter, index) => (
          <div
            className={styles.chapterItemContainer}
            onClick={() => {
              navigate(`/chapter/${chapter}`);
            }}
          >
            Chapter {Number((chapterLinks?.length || 0) - index)}
          </div>
        ))}
      </div>
    </>
  );
};
