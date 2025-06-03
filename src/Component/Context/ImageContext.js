import React, { createContext, useState } from "react";

export const ImageContext = createContext();


export const ImageProvider = ({ children }) => {
  const [cropImage, setCropImages] = useState(null);
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [deskimg, setDeskimg] = useState(null);
  const [deskpoint, setDeskpoint] = useState(null)
  const [imgurl, setImgurl] = useState(null);

  return (
    <ImageContext.Provider value={{ cropImage, setCropImages, selectedDoor, setSelectedDoor, deskimg, setDeskimg, deskpoint, setDeskpoint, imgurl, setImgurl }}>
      {children}
    </ImageContext.Provider>
  );
};
