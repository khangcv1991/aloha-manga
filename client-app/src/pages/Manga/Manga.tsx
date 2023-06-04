import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChapterList } from '../../components/chapterList/ChapterList';
import { PAGE_STAGE, PageContext } from '../../utils/PageContext';
import styles from './manga.module.scss';
import GroupRadioButton from '../../components/navTab/GroupRadioButton';
import Page from '../../components/page/Page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FavoritButton } from './FavoritButton/FavoritButton';
const RadioButtons = [
  { id: 'information', title: 'Information' },
  { id: 'chapter', title: 'Chapter' },
];

export const MangaPage = (): JSX.Element => {
  const { mangaId } = useParams();
  const { setPageStage, mangaByMangaId, setReadingManga, pageStage } =
    useContext(PageContext);
  const [selectedButton, setSelectedButton] = useState(RadioButtons[0]);

  useEffect(() => {
    setReadingManga(mangaId);
    if (pageStage !== PAGE_STAGE.MANGA_DETAIL) {
      setPageStage(PAGE_STAGE.MANGA_DETAIL);
    }
  }, []);

  return (
    <>
      <Page title="Manga">
        <div className={styles.mangaContainer}>
          <div className={styles.mangaImgContainer}>
            <h1>{mangaByMangaId?.[mangaId]?.title}</h1>
            <img src={mangaByMangaId?.[mangaId]?.imageLink} />
          </div>
          <GroupRadioButton
            radioButtons={RadioButtons}
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
          />
          <div className={styles.bodyContainer}>
            {selectedButton?.id === 'information' && (
              <>
                <FavoritButton />
                <p>{mangaByMangaId?.[mangaId]?.author}</p>
                <p>{mangaByMangaId?.[mangaId]?.categories?.join(', ')}</p>

                <p>{mangaByMangaId?.[mangaId]?.description}</p>
              </>
            )}
            {selectedButton?.id === 'chapter' && (
              <ChapterList
                chapterLinks={mangaByMangaId?.[mangaId]?.chapterLinks || []}
              />
            )}
          </div>
        </div>
      </Page>
    </>
  );
};
