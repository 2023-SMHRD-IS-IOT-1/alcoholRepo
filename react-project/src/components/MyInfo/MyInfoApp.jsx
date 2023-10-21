import React from 'react';
import { ImageProvider } from './ImageContext';
import MyInfo from './MyInfo';
import ProfileImg from './ProfileImg';

function App() {
  return (
    <ImageProvider>
      <ProfileImg />
      <MyInfo />
    </ImageProvider>
  );
}

export default App;
