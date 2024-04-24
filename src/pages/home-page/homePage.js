import React from 'react';

import Header from '../../components/header-home-page/Header';
import Search from '../../components/search-home-page/Search';
import ImageContainer from '../../components/photosphere-module-home-page/ImageContainer';
import AboutUs from '../../components/about-us-module-home-page/ContainerAboutUs';
import OverviewContainer from '../../components/list-projects-module-home-page/OverViewContainer'; 

import styles from './homePage.module.css';

function HomePage() {

  const user = {
    username: 'exampleUser',
    is_authenticated: true
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
