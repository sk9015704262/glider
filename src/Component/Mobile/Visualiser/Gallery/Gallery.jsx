import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./gallery.css";
import CloseIcon from "@mui/icons-material/Close";
import image1 from "../../../images/Platinum.jpg";
import image2 from "../../../images/Roller Door.jpg";
import image3 from "../../../images/section_hampton_windspray.jpg";
import image4 from "../../../images/Sectional Door.jpg";
import image5 from "../../../images/sectional_madison_monument_smooth_home.jpg";
import image6 from "../../../images/sectional_madison_nightsky.jpg";
import image7 from "../../../images/sectional_tuscan_dover_white.jpg";
import image8 from "../../../images/Selections.jpg";

function Gallery({ open, handleClose, selectgalleryimage }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc); 
    selectgalleryimage(imageSrc); 
    handleClose()    
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            className="d-grid p-4 gallery-section position-relative"
            style={{ overflowY: "scroll", height: "500px" }}
          >
            <div className="d-flex justify-content-between flex-wrap position-fixed w-100 p-2 ps-3 pe-3 bg-white">
              <h2>Gallery</h2>
              <CloseIcon onClick={handleClose} className="close text-end" style={{"cursor":"pointer"}} />
            </div>

            {/* <h5 className="mt-4">Double door designs</h5> */}
            <h5 className="mt-4">Door designs</h5>
            <div className="row g-2">
              {[image1, image2, image3, image4,image5, image6, image7, image8].map((img, index) => (
                <div className="col-12 col-md-3" key={index}>
                  <img
                    src={img}
                    alt="double-door"
                    className={`img-fluid gallery-image ${
                      selectedImage === img ? "selected" : ""
                    }`}
                    onClick={() => handleImageClick(img)}
                  />
                </div>
              ))}
            </div>

            {/* <h5 className="mt-4">Single door designs</h5>
            <div className="row g-2">
              {[image5, image6, image7, image8].map((img, index) => (
                <div className="col-12 col-md-3" key={index}>
                  <img
                    src={img}
                    alt="single-door"
                    className={`img-fluid gallery-image ${
                      selectedImage === img ? "selected" : ""
                    }`}
                    onClick={() => handleImageClick(img)}
                  />
                </div>
              ))}
            </div> */}
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default Gallery;
