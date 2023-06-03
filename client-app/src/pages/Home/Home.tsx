import React, { useContext } from 'react';
import Page from '../../components/page/Page';
import MangaList from '../../components/mangaList/MangaList';
import { PageContext } from '../../utils/PageContext';
import Navbar from '../../components/navbar/Navbar';
import styles from './home.module.scss';

const Home = (): JSX.Element => {
  const { mangas, filteringMangas } = useContext(PageContext);

  return (
    <Page title="Home">
      <Navbar />
      <MangaList mangas={filteringMangas} className={styles.mangaList} />
    </Page>
  );
};

export default Home;
