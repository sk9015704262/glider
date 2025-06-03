import React, { useState, useContext } from "react";
import Header from "../../Dashboard/Header/Header";
import BackupIcon from "@mui/icons-material/Backup";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import "./Chooseimg.css";
import { Box, Typography } from "@mui/material";
// import Cropimage from "../CropSelect/Cropimage";
import DoorCrop from "../DoorCrop/DoorCrop";
import { useNavigate } from "react-router-dom";
import Gallery from "../Gallery/Gallery";
import { ImageContext } from "../../../Context/ImageContext";

function Chooseimg() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  // const [selectedDoor, setSelectedDoor] = useState(false);
  const [progressStage, setProgressStage] = useState(66);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
    const { setCropImages } = useContext(ImageContext);
  

  const openModal = () => {
    setOpen(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      setLoading(true);
      setProgress(10);
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let progressValue = 10;
        const interval = setInterval(() => {
          progressValue += 10;
  
          if (progressValue >= 100) {
            clearInterval(interval);
            setLoading(false);
            setProgress(100);
            setSelectedImage(reader.result);
            setCropImages(reader.result);
            setProgressStage(100);
          } else {
            setProgress(progressValue);
          }
        }, 300);
      };
    }
  };
  

 
  const getProgressText = () => {
    if (progressStage === 66) return "1/2";
    if (progressStage === 100) return "2/2";
    return "";
  };

  const handleBack = () => {
    if (progressStage === 100) {
      setProgressStage(66);
      setSelectedImage(null);
      setCropImages(null);
    } 
  };

  const selectgalleryimage = (img) => {
    setSelectedImage(img)
    setProgressStage(100);
    setCropImages(img)
    // console.log(img)
  }

  


  return (
    <>
      <Header />
      <section className="chooseimg mt-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Welcome to the Design Centre</h1>
              <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
                <p className="choose-text mb-0">Choose an Image</p>
                <Box position="relative" display="inline-flex">
                  <CircularProgress
                    variant="determinate"
                    value={progressStage}
                    size={40}
                  />
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    sx={{
                      transform: "translate(-50%, -50%)",
                      fontWeight: "bold",
                    }}
                  >
                    <Typography variant="body1">{getProgressText()}</Typography>
                  </Box>
                </Box>
              </div>
              {loading ? (
                <>
                  <p>
                    Great! Now, upload an image of your home or select one from
                    the Gliderol gallery to begin designing your garage door.
                  </p>
                  <div className="progress-container mb-3">
                    <LinearProgress variant="determinate" value={progress} />
                    <p className="progress-text">Uploading {progress}%</p>
                  </div>
                  <button className="btn continue mb-3" disabled={loading}>
                    {loading ? "Continue" : "Continue"}
                  </button>
                  <button
                    className="btn back mb-3"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </>
              ) : selectedImage ? (
                <DoorCrop handleBack={handleBack} />             
              ) : (
                <>
                  <p>
                    Great! Now, upload an image of your home or select one from
                    the Gliderol gallery to begin designing your garage door.
                  </p>
                  <label htmlFor="file" className="btn upload mb-3">
                    <BackupIcon className="me-2" />
                    Upload a Photo of My Own
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <button className="btn upload mb-5" onClick={openModal}>
                    <FileOpenIcon className="me-2" />
                    Choose from Gliderol Gallery
                  </button>
                  <button className="btn continue mb-3">Continue</button>
                  <button
                    className="btn back mb-3"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <Gallery open={open} handleClose={handleClose} selectgalleryimage={selectgalleryimage}/>
    </>
  );
}

export default Chooseimg;
