import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.scss';
import { SideBar } from '../SideBar/SideBar';
const WINDOW_WIDTH_XS = 576;

const Footer = (): JSX.Element => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
      {windowWidth < WINDOW_WIDTH_XS ? (
        <SideBar isVertical={false} />
      ) : (
        <>
          <div className={styles.footer}>
            <div className={styles.footerWrapper}>
              <div className={styles.content}>Aloha Manga©2023</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Footer;
