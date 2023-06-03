import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChapterList } from '../../components/chapterList/ChapterList';
import { PageContext } from '../../utils/PageContext';
import styles from './manga.module.scss';
import GroupRadioButton from '../../components/navTab/GroupRadioButton';
import Page from '../../components/page/Page';
const RadioButtons = [
  { id: 'information', title: 'Information' },
  { id: 'chapter', title: 'Chapter' },
];

export const MangaPage = (): JSX.Element => {
  const { mangaId } = useParams();
  const { mangaByMangaId, setReadingManga } = useContext(PageContext);
  const [selectedButton, setSelectedButton] = useState(RadioButtons[0]);

  useEffect(() => {
    setReadingManga(mangaId);
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
