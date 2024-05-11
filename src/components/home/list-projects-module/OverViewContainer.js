import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import styles from'./OverViewContainer.module.scss'

const OverViewContainer = () => {
  const [projects, setProjects] = useState(null);

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

  useEffect(() => {
    if (projects) {
      console.log("Projects updated:", projects);
    }
  }, [projects]);

  if (!projects) {
    return (    
      <div className={styles.overviewContainer}>
        <a className={styles.caption}>Проекты</a>
      </div>
    );
  }

  return (
    <div className={styles.overviewContainer}>
      <a className={styles.caption}>Проекты</a>
      <div className={styles.projectsContainer}>
        {projects.map(project => (
          <div key={project.id} className={styles.oneProjectContainer}>
            <Link className={styles.hrefToProject} to={`/interface/${project.name}/${project.main_location}/${project.id}`}>
              <div className={styles.wrapperImgProject}>
                <img className={styles.imgProject} src={project.cover} alt={project.name} />
              </div>
              <span className={styles.projectName}>{project.name}</span>
              <span className={styles.projectBio}>{project.bio}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default OverViewContainer;
