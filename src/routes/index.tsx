import React from 'react';
import { RouteComponentProps } from '@reach/router';
import GalleryContainer from '../components/GalleryContainer';

const Index: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <div>Home</div>
      <GalleryContainer />
    </>
  );
};

export default Index;
