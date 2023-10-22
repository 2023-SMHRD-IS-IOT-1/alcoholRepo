// import React, { createContext, useContext, useState } from 'react';
// import { Userinfo } from '../../data/Data';

// const ImageContext = createContext({
//     selectedImage: null,
//     setSelectedImage: () => {}
// });

// export const ImageProvider = ({ children }) => {
//   const [selectedImage, setSelectedImage] = useState('');

//   return (
//     <ImageContext.Provider value={{ selectedImage, setSelectedImage }}>
//       { children }
//     </ImageContext.Provider>
//   );
// }

export const useImage = () => {
  return useContext(ImageContext);
}
