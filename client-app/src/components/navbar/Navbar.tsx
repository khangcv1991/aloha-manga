import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.scss';
import CategoryFilter from './CategoryFilter/CategoryFilter';
import SearchBar from './SearchBar/SearchBar';
import { pageContext } from '../../utils/PageContext';

const Navbar = (): JSX.Element => {
  const { categories } = useContext(pageContext);
  return (
    <div className={styles.navbar}>
      <div className={styles.navContainer}>
        <SearchBar />
        <CategoryFilter
          categories={categories?.slice(0, 5)}
          isMutiSelect={false}
        />
      </div>
    </div>
  );
};

export default Navbar;
