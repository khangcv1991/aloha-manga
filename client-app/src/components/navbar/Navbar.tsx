import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.scss';
import CategoryFilter from './CategoryFilter/CategoryFilter';
import SearchBar from './SearchBar/SearchBar';
const dummyCategories = [
  {
    id: 'id1',
    title: 'Manhwa',
  },
  {
    id: 'id2',
    title: 'Manga',
  },
  {
    id: 'id3',
    title: 'Anime',
  },
];

const Navbar = (): JSX.Element => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navContainer}>
        <SearchBar />
        <CategoryFilter categories={dummyCategories} isMutiSelect={false} />
      </div>
    </div>
  );
};

export default Navbar;
