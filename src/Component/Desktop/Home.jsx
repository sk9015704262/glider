import React, { useContext, useRef, useState } from "react";
import logo from "../images/logo2.svg";
import design from "../images/design-centre.svg";
import HomeIcon from "@mui/icons-material/Home";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CollectionsIcon from "@mui/icons-material/Collections";
import Gallery from "../Mobile/Visualiser/Gallery/Gallery";
import { ImageContext } from "../Context/ImageContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const fileInputRef = useRef(null);
  const { setDeskimg, setDeskpoint } = useContext(ImageContext);
  const navigate = useNavigate();

  const handleClosed = () => setOpen(false);
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new window.Image();

        img.onload = () => {
          setDeskimg(event.target.result);
          //   console.log("Image uploaded successfully: ",event.target.result);
          navigate("/costomising");
        };

        img.src = event.target.result;
      };

      reader.readAsDataURL(file);
    }
  };

  const selectgalleryimage = (img) => {
    setDeskimg(img);
   if (img.includes("Platinum")) {
         setDeskpoint([
          { x: 405, y: 313 },
          { x: 660, y: 316 },
          { x: 661, y: 426 },
          { x: 403, y: 422 },
        ]);
      } else if (img.includes("Roller Door")) {
         setDeskpoint([
          { x: 451, y: 315 },
          { x: 781, y: 316 },
          { x: 778, y: 470 },
          { x: 452, y: 467 },
        ]);
      } else if (img.includes("section_hampton_windspray")) {
         setDeskpoint([
          { x: 382, y: 262 },
          { x: 713, y: 264 },
          { x: 720, y: 476 },
          { x: 381, y: 477 },
        ]);
      } else if (img.includes("Sectional Door")) {
         setDeskpoint([
          { x: 242, y: 343 },
          { x: 451, y: 346 },
          { x: 450, y: 468 },
          { x: 242, y: 466 },
        ]);
      } else if (img.includes("sectional_madison_monument_smooth_home")) {
         setDeskpoint([
          { x: 339, y: 385 },
          { x: 539, y: 370 },
          { x: 537, y: 505 },
          { x: 340, y: 486 },
        ]);
      } else if (img.includes("sectional_madison_nightsky")) {
         setDeskpoint([
          { x: 388, y: 243 },
          { x: 704, y: 252 },
          { x: 699, y: 482 },
          { x: 386, y: 485 },
        ]);
      } else if (img.includes("sectional_tuscan_dover_white")) {
         setDeskpoint([
          { x: 412, y: 259 },
          { x: 661, y: 261 },
          { x: 659, y: 378 },
          { x: 409, y: 381 },
        ]);
      } else if (img.includes("Selections")) {
         setDeskpoint([
          { x: 396, y: 331 },
          { x: 613, y: 329 },
          { x: 614, y: 435 },
          { x: 395, y: 437 },
        ]);
      } else {
         setDeskpoint([
          { x: 250, y: 250 },
          { x: 550, y: 250 },
          { x: 550, y: 400 },
          { x: 250, y: 400 },
        ]);
      }
    navigate("/costomising");
  };

  return (
    <>
      <section className="home">
        <div className="home-head d-flex justify-content-between align-items-center">
          <div className="logo">
            <img src={logo} alt="logo" loading="lazy" />
          </div>
          <div className="logo">
            <img src={design} alt="design-center" loading="lazy" />
          </div>
          <div className="logo">
            <HomeIcon sx={{ color: "#fff", fontSize: "32px" }} />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="home-content mt-5">
              <h1 className="text-center">Welcome to the Design Centre</h1>
              <p className="text-center">
                Upload a photo of your own home or choose one from the gallery
                to begin customising your own garage door. With a large range of
                styles and colours, Gliderol offers something that will suit
                every home. Once you have designed your dream garage door, you
                can either save your design or send to your nearest Dealer for a
                FREE Measure and Quote.
              </p>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-5">
              <div className="upload">
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />

                <div
                  className="text-center pt-3 upload-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <CloudUploadIcon
                    sx={{ fontSize: "40px", marginBottom: "20px" }}
                  />
                  <p>Upload a Photo of Your Own</p>
                </div>
              </div>
              <div className="upload ms-5">
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />

                <div
                  className="text-center pt-3 upload-btn"
                  onClick={openModal}
                >
                  <CollectionsIcon
                    sx={{ fontSize: "40px", marginBottom: "20px" }}
                  />
                  <p>Choose from Gliderol Gallery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Gallery
        open={open}
        handleClose={handleClosed}
        selectgalleryimage={selectgalleryimage}
      />
    </>
  );
}

export default Home;
