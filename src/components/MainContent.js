import React from 'react';
import Header from './Header';
import Search from './Search';
import ImageContainer from './ImageContainer';
import OtherContainer from './OtherContainer';

const MainContent = ({}) => {

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
      <OtherContainer />
    </div>
  );
}

export default MainContent;


//Роутинг и отображение компонента