import React from 'react';

import ImageContainer from '@Components/interface/photosphere-module/ImageContainer';
import Header from '@Components/interface/header/Header';

import { useParams } from 'react-router-dom';

import styles from './interfacePage.module.css';

function interfacePage() {

  const { project, location, photosphere } = useParams();

  const user = {
    username: 'exampleUser',
    is_authenticated: false,
  };

  const csrf_token = 'your_csrf_token_here';

  return (
    <div className={styles.mainContainer}>
      <Header user={user} csrf_token={csrf_token} project={project} location={location} photosphere={photosphere} />
      <ImageContainer project={project} location={location} photosphere={photosphere} />
    </div>
  );
}

export default interfacePage;
