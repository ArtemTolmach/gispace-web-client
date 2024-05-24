import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './interfacePage.module.scss';

import Header from '@Components/interface/header/header';
import ImageContainer from '@Components/interface/photosphereContainer/photosphereContainer';

function InterfacePage() {
  const { project, location, photosphere } = useParams();

  document.documentElement.style.height = "100vh";
  document.body.style.overflow= 'hidden';
  
  return (
    <div className={styles.mainContainer}>
      <Header project={project} location={location} photosphere={photosphere} />
      <ImageContainer project={project} location={location} photosphere={photosphere} />
    </div>
  );
}

export default InterfacePage;
