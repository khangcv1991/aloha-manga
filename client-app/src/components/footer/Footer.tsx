import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.scss';
import { SideBar } from '../SideBar/SideBar';
import { PAGE_STAGE, PageContext } from '../../utils/PageContext';
import { ChapterNav } from '../../pages/Chapter/ChapterNav/ChapterNav';
const WINDOW_WIDTH_XS = 576;

const Footer = (): JSX.Element => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { pageStage } = useContext(PageContext);

  useEffect(() => {
    // Function to update window width
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Attach event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <>
      <div className={styles.footerSideBarContainer}>
        {pageStage !== PAGE_STAGE.CHAPTER_DETAIL && (
          <SideBar isVertical={false} />
        )}
      </div>
      {pageStage === PAGE_STAGE.CHAPTER_DETAIL ? (
        <ChapterNav />
      ) : (
        <div className={styles.footer}>
          <div className={styles.footerWrapper}>
            <div className={styles.content}>©2023 Aloha Manga</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
