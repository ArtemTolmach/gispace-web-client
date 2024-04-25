import React from 'react';
import search from "@Assets/images/search.png";

import styles from './Search.module.css'

const SearchForm = () => {
  return (
    <form className={styles.search}>
      <img src={search} className={styles.searchIcon} alt="Search Icon" />
      <input className={styles.searchInput} type="search" placeholder="Поиск" />
    </form>
  );
}

export default SearchForm;
