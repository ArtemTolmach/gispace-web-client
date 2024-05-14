import React, { useState, useEffect} from 'react';

import ImageContainer from '@Components/interface/photosphere-module/ImageContainer';
import Header from '@Components/interface/header/Header';

import { useParams } from 'react-router-dom';

import styles from './interfacePage.module.scss';

function interfacePage() {
  const [name, setName] = useState('');
  const { project, location, photosphere } = useParams();
  
{/*
  useEffect(() => {
    (
      async () => {
        const response = await fetch('http://127.0.0.1:8000/user', {
          headers:{ 'Content-Type': 'application/json'},
          credentials: 'include'
        });

        const content = await response.json();

        console.log(content);

        setName(content.name);
      }
    )();
  });
*/}

  return (
    <div className={styles.mainContainer}>
      <Header project={project} location={location} photosphere={photosphere} name={name} />
      <ImageContainer project={project} location={location} photosphere={photosphere} />
    </div>
  );
}

export default interfacePage;
