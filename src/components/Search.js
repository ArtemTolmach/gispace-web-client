import React from 'react';
import search from "../assets/images/search.png";

const SearchForm = () => {
  return (
    <form className="search">
      <img src={search} className="search-icon" alt="Search Icon" />
      <input className="search-input" type="search" placeholder="Поиск" />
    </form>
  );
}

export default SearchForm;
