import React from 'react';
import OverviewContainer from './OverViewContainer';
import ContainerAboutUs from './ContainerAboutUs';

const OtherContainer = ({ objectList }) => {
  return (
    <div className="other-container">
      <OverviewContainer objectList={objectList} />
      <ContainerAboutUs />
    </div>
  );
}

export default OtherContainer;
