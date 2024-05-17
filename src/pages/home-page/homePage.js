import React from 'react';

import Header from '@Components/home/header/Header';
import Search from '@Components/home/search/Search';
import ImageContainer from '@Components/home/photosphere-module/ImageContainer';
import AboutUs from '@Components/home/about-us-module/ContainerAboutUs';
import OverviewContainer from '@Components/home/list-projects-module/OverViewContainer'; 

import styles from './homePage.module.scss';

function HomePage() {

  return (
    <div className={styles.mainContainer}>
        <Header />
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
