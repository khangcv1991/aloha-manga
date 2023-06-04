import React, { useContext, useEffect } from 'react';
import Page from '../../components/page/Page';
import MangaList from '../../components/mangaList/MangaList';
import { PAGE_STAGE, PageContext } from '../../utils/PageContext';
import Navbar from '../../components/navbar/Navbar';
import styles from './home.module.scss';

const Home = (): JSX.Element => {
  const { mangas, filteringMangas, setPageStage } = useContext(PageContext);

  useEffect(() => {
    setPageStage(PAGE_STAGE.HOME);
  }, []);

  return (
    <Page title="Home">
      <Navbar />
      <MangaList mangas={filteringMangas} className={styles.mangaList} />
    </Page>
  );
};

export default Home;
