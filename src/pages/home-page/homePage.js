import React from 'react';

import Header from '@Components/home/header/Header';
import Search from '@Components/home/search/Search';
import ImageContainer from '@Components/home/photosphere-module/ImageContainer';
import AboutUs from '@Components/home/about-us-module/ContainerAboutUs';
import OverviewContainer from '@Components/home/list-projects-module/OverViewContainer'; 

import styles from './homePage.module.css';

function HomePage() {

  const user = {
    username: 'exampleUser',
    is_authenticated: true,
  };

  const csrf_token = 'your_csrf_token_here';

  return (
    <div className={styles.mainContainer}>
        <Header user={user} csrf_token={csrf_token} />
        <Search />
        <ImageContainer />
        <div className={styles.otherContainer}>
            <OverviewContainer />
            <AboutUs />
        </div>
    </div>
  );
}

export default HomePage;
