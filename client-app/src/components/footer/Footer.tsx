import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.scss';

const Footer = (): JSX.Element => (
  <div className={styles.footer}>
    <div className={styles.footerWrapper}>
      <div className={styles.content}>Aloha Manga©2023</div>
    </div>
  </div>
);

export default Footer;
