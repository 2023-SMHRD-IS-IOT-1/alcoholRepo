import React, { createContext, useContext, useState } from 'react';

const ImageContext = createContext({
    selectedImage: null,
    setSelectedImage: () => {}
});

export const ImageProvider = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <ImageContext.Provider value={{ selectedImage, setSelectedImage }}>
      {children}
    </ImageContext.Provider>
  );
}

export const useImage = () => {
  return useContext(ImageContext);
}
