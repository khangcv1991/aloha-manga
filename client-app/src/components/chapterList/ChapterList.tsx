import React, { useContext, useState } from 'react';
import styles from './chapterList.module.scss';
import { useNavigate } from 'react-router-dom';
import { PageContext } from '../../utils/PageContext';

interface ChapterListProps {
  chapterLinks: string[];
}
export const ChapterList = (props: ChapterListProps): JSX.Element => {
  const { chapterLinks } = props;
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { readingChapter, setReadingChapter } = useContext(PageContext);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // console.log(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // console.log(false);
  };
  return (
    <>
      <div
        className={styles.chapterContainer}
        // style={{ overflow: isHovered ? 'auto' : 'hidden' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {chapterLinks?.map((chapter, index) => (
          <div
            className={styles.chapterItemContainer}
            onClick={() => {
              navigate(`/chapter/${chapter}`);
              setReadingChapter(chapter);
            }}
          >
            Chapter {Number((chapterLinks?.length || 0) - index)}
          </div>
        ))}
      </div>
    </>
  );
};
