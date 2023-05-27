import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ChapterList } from '../components/chapterList/ChapterList';
import { pageContext } from '../utils/PageContext';

export const MangaPage = (): JSX.Element => {
  const { mangaId } = useParams();
  const { mangaByMangaId } = useContext(pageContext);

  return (
    <>
      <ChapterList
        chapterLinks={mangaByMangaId?.[mangaId]?.chapterLinks || []}
      />
    </>
  );
};
