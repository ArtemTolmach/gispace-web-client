import React, { useState, useEffect } from 'react';

import styles from'./OverViewContainer.module.css'

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
            <a className={styles.hrefToProject} href={`/${project.name}/${project.main_location}/${project.id}`}>
              <div className={styles.wrapperImgProject}>
                <img className={styles.imgProject} src={project.cover} alt={project.name} />
              </div>
              <span className={styles.projectName}>{project.name}</span>
              <span className={styles.projectBio}>{project.bio}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default OverViewContainer;
