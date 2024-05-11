import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import search from "@Assets/images/search.png";

import styles from './Search.module.scss'

const SearchForm = () => {
  const [projects, setProjects] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/photospheres/get-project-list/');
        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }
        const data = await response.json();
        console.log(data);
        setProjects(data);
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };
    
    fetchProjects();
  }, []); 

  const handleSearch = (e) => {
    const inputValue = e.target.value.toLowerCase();
    const regex = new RegExp(inputValue, 'i');
    let filtered = projects.filter(project => 
      regex.test(project.name.toLowerCase()) || 
      regex.test(project.bio.toLowerCase())
    );
  
    if (inputValue === '') {
      setFilteredProjects(null);
      setSearched(false);
    } else {
      setFilteredProjects(filtered);
      setSearched(true);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <form className={styles.search}>
        <img src={search} className={styles.searchIcon} alt="Search Icon" />
        <input className={styles.searchInput} type="search" placeholder="Поиск" onChange={handleSearch} />
      </form>
      <ul className={styles.suggestions}>
        {searched && filteredProjects ? (
          filteredProjects.map(project => (
            <li key={project.id} className={styles.suggestionItem}>
              <Link className={styles.suggestionHrefToProject} to={`/interface/${project.name}/${project.main_location}/${project.id}`}>
                <img className={styles.suggestionImgProject} src={project.cover} alt={project.name} />
                <div className={styles.suggestionText}>
                  <span className={styles.suggestionProjectName}>{project.name}</span>
                  <span className={styles.suggestionProjectBio}>{project.bio}</span>
                </div>
              </Link>
            </li>
          ))
        ) : null}
      </ul>
    </div>
  );
}

export default SearchForm;
