import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import styles from './search.module.scss'

import { BACKEND_HOST } from '@Utils/exportDataFromEnv/exportDataFromEnv';

import search from "@Assets/images/search.png";

const SearchForm = () => {
  const [projects, setProjects] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${BACKEND_HOST}/api/photospheres/get-project-list/`);
        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };
    
    fetchProjects();
  }, []);

  const handleSearch = (e) => {
    const inputValue = e.target.value;
    const regex = new RegExp(inputValue, 'i');
    let filtered = projects.filter(project => 
      regex.test(project.name) || 
      regex.test(project.bio)
    );
  
    if (inputValue === '') {
      setFilteredProjects(null);
    } else {
      setFilteredProjects(filtered);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.search}>
        <img src={search} className={styles.searchIcon} alt="Search Icon" draggable="false"/>
        <input className={styles.searchInput} type="search" placeholder="Поиск" onChange={handleSearch} />
      </div>
      <ul className={styles.suggestions}>
        {filteredProjects ? (
          filteredProjects.map(project => (
            <li key={project.id} className={styles.suggestionItem}>
              <Link className={styles.suggestionHrefToProject} to={`/interface/${project.name}/${project.main_location.id}/${project.main_location.main_sphere}`}>
                <img className={styles.suggestionImgProject} src={project.cover} alt={project.name} draggable="false"/>
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
