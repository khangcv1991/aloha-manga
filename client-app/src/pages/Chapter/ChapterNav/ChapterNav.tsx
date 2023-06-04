import React, { useContext } from 'react';
import { PageContext } from '../../../utils/PageContext';
import styles from './chapterNav.module.scss';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faBook,
  faBookOpenReader,
} from '@fortawesome/free-solid-svg-icons';

export const ChapterNav = (): JSX.Element => {
  const { readingManga, readingChapter, mangaByMangaId, setReadingChapter } =
    useContext(PageContext);
  const navigate = useNavigate();

  return (
    <div className={styles.chapterNavContainer}>
      <div className={styles.btnGroupContainer}>
        <FontAwesomeIcon
          icon={faBookOpenReader}
          className={styles.item}
          size="2xl"
          onClick={() => {
            navigate(`/manga/${readingManga}`);
          }}
        />
        <FontAwesomeIcon
          icon={faArrowAltCircleLeft}
          className={styles.item}
          size="2xl"
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
        />
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
        <FontAwesomeIcon
          icon={faArrowAltCircleRight}
          className={styles.item}
          size="2xl"
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
        />
      </div>
    </div>
  );
};
