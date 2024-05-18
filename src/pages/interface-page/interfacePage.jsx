import React, { useState, useEffect} from 'react';

import ImageContainer from '@Components/interface/photosphere-module/ImageContainer';
import Header from '@Components/interface/header/Header';

import { useParams } from 'react-router-dom';

import styles from './interfacePage.module.scss';

function interfacePage() {
  const { project, location, photosphere } = useParams();
  
  return (
    <div className={styles.mainContainer}>
      <Header project={project} location={location} photosphere={photosphere} />
      <ImageContainer project={project} location={location} photosphere={photosphere} />
    </div>
  );
}

export default interfacePage;
