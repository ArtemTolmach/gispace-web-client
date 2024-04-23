import React from 'react';

import Header from '../../components/header-home-page/Header';
import Search from '../../components/search-home-page/Search';
import ImageContainer from '../../components/photosphere-module-home-page/ImageContainer';
import AboutUs from '../../components/about-us-module-home-page/ContainerAboutUs';
import OverviewContainer from '../../components/list-projects-module-home-page/OverViewContainer'; 

function HomePage() {

  const user = {
    username: 'exampleUser',
    is_authenticated: true
  };

  const csrf_token = 'your_csrf_token_here';

  return (
    <div className="main-container">
        <Header user={user} csrf_token={csrf_token} />
        <Search />
        <ImageContainer />
        <div className="other-container">
            <OverviewContainer />
            <AboutUs />
        </div>
    </div>
  );
}

export default HomePage;
