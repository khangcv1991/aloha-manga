import React, { useState } from 'react';
import Footer from '../footer/Footer';
import styles from './page.module.scss';
import { SideBar } from '../SideBar/SideBar';

interface Props {
  title: string;
  description?: string;
  children: JSX.Element[] | JSX.Element;
}

const Page = (props: Props): JSX.Element => {
  const { title, description = title, children } = props;

  return (
    <>
      <div>
        <title>Aloha Manga - {title}</title>
        <meta name="description" content={description} />
        <script async src="https://kit.fontawesome.com/c6e566ba48.js" />
      </div>
      <div className={styles.page}>
        <div className={styles.container}>
          <SideBar className={styles.leftContainer} />
          <div className={styles.rightContainer}>{children}</div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Page;
