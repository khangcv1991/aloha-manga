import React, { useContext } from 'react';
import { PageContext } from '../../../utils/PageContext';
import styles from './chapterNav.module.scss';
import { useNavigate } from 'react-router-dom';

export const ChapterNav = (): JSX.Element => {
  const { readingManga, readingChapter, mangaByMangaId, setReadingChapter } =
    useContext(PageContext);
  const navigate = useNavigate();

  return (
    <div className={styles.chapterNavContainer}>
      <div className={styles.btnGroupContainer}>
        <button
          onClick={() => {
            navigate('/');
          }}
        >
          Home
        </button>
        <button
          className={styles.prevBtn}
          onClick={() => {
            const index =
              mangaByMangaId?.[readingManga]?.chapterLinks?.indexOf(
                readingChapter,
              );
            if (
              index <
              mangaByMangaId?.[readingManga]?.chapterLinks?.length - 1
            ) {
              const chapterId =
                mangaByMangaId?.[readingManga]?.chapterLinks?.[index + 1];
              setReadingChapter(chapterId);
              navigate(`/chapter/${chapterId}`);
            }
          }}
        >
          Previous
        </button>
        <select
          className={styles.chapterSelect}
          onChange={(e) => {
            setReadingChapter(e?.target?.value);
            navigate(`/chapter/${e?.target?.value}`);
          }}
          value={readingChapter}
        >
          {mangaByMangaId?.[readingManga]?.chapterLinks?.map((link, index) => (
            <option value={link}>
              Chapter{' '}
              {(mangaByMangaId?.[readingManga]?.chapterLinks?.length || 0) -
                index}
            </option>
          ))}
        </select>
        <button
          className={styles.nextBtn}
          onClick={() => {
            const index =
              mangaByMangaId?.[readingManga]?.chapterLinks?.indexOf(
                readingChapter,
              );
            if (index > 0) {
              const chapterId =
                mangaByMangaId?.[readingManga]?.chapterLinks?.[index - 1];
              setReadingChapter(chapterId);
              navigate(`/chapter/${chapterId}`);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
