import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.scss';
import CategoryFilter from './CategoryFilter/CategoryFilter';
import SearchBar from './SearchBar/SearchBar';
import { PageContext } from '../../utils/PageContext';

const Navbar = (): JSX.Element => {
  const { categories } = useContext(PageContext);
  return (
    <div className={styles.navbar}>
      <div className={styles.navContainer}>
        <SearchBar />
        <CategoryFilter categories={categories} isMutiSelect={false} />
      </div>
    </div>
  );
};

export default Navbar;
