import React, { useState, useEffect } from 'react';
import './OverViewContainer.css'

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
      <div className="overview-container">
        <a className="caption">Проекты</a>
      </div>
    );
  }

  return (
    <div className="overview-container">
      <a className="caption">Проекты</a>
      <div className="projects-container">
        {projects.map(project => (
          <div key={project.id} className="one-project-container">
            <a className="href-to-project" href={`/${project.name}/${project.main_location}/${project.id}`}>
              <div className="wrapper-img-project">
                <img className="img-project" src={project.cover} alt={project.name} />
              </div>
              <span className="project-name">{project.name}</span>
              <span className="project-bio">{project.bio}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default OverViewContainer;
