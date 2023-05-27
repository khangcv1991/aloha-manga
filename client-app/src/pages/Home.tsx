import React, { useContext } from 'react';
import Page from '../components/page/Page';
import MangaList from '../components/mangaList/MangaList';
import { pageContext } from '../utils/PageContext';

const Home = (): JSX.Element => {
  const { mangas } = useContext(pageContext);

  return (
    <Page title="Home">
      <MangaList mangas={mangas} />
    </Page>
  );
};

export default Home;
