import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
// import Header from "./Header";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Alert, Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import "./Desktop.css";
import roller from "../images/roller.svg";
import sectional from "../images/sectional.svg";
import native from "../images/native_icon.svg";
import master from "../images/master_icon.svg";
import hampton from "../images/hampton_icon.svg";
import caeser from "../images/caesar_icon.svg";
import baron from "../images/baron_icon.svg";
import sultan from "../images/sultan_icon.svg";
import royall from "../images/royal_l_icon.svg";
import royalr from "../images/royal_r_icon.svg";
import regent from "../images/regent_icon.svg";
import centerbury from "../images/Centerbury.png";
import centerburyOxford from "../images/caenterbury-img-oxford.png";
import countryOxford from "../images/county-img-oxford.png";
import country from "../images/Country.png";
import cascade from "../images/cascade.png";
import sunset from "../images/sunset.png";
import sunburst from "../images/sunburst.png";
import traditional from "../images/traditional.png";
import waterton from "../images/waterton.png";
import compositeimg from "../images/composite.svg";
import miniorb from "../images/mini_orb.svg";
import honeycomb from "../images/honeycomb.svg";
import aluminium from "../images/aluminium.svg";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Gallery from "../Mobile/Visualiser/Gallery/Gallery";
import ContactForm from "../Shared/ContactForm/ContactForm";
import LoopIcon from "@mui/icons-material/Loop";
import CollectionsIcon from "@mui/icons-material/Collections";
import { ImageContext } from "../Context/ImageContext";
import { createPattern } from "./Pattern";
import DraggableHandle from "./DraggableHandle";
import { getPerspectiveTransformMatrix } from "../lib/perspective-transform";
import html2canvas from "html2canvas";

function Customise() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [view, setView] = useState("detail");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState("#5f1d0f");
  const [selectedRect, setSelectedRect] = useState(null);
  const { deskimg, deskpoint, setImgurl } = useContext(ImageContext);
  const [backImage, setBackImage] = useState(deskimg || null);
  const [selectedPattern, setSelectedPattern] = useState("roller");
  const [selectSeries, setSelectseries] = useState("");
  const [selectedDesign, setSelectedDesign] = useState("");
  const [selectedPanelStyle, setPanelStyle] = useState("");
  const [colorname, setColorName] = useState("Manor Red");
  const [selctwindow, setSelectWindow] = useState("");
  const [SelectedMaterial, setSelectedMaterial] = useState("Composite");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const stageRef = useRef(null);
  const [points, setPoints] = useState(
    deskpoint || [
      { x: 250, y: 250 }, // top-left
      { x: 550, y: 250 }, // top-right
      { x: 550, y: 400 }, // bottom-right
      { x: 250, y: 400 }, // bottom-left
    ]
  );
  // console.log(deskpoint)
  console.log(points)
  const [bgKonvaImage, setBgKonvaImage] = useState(null);
  const [showHandles, setShowHandles] = useState(true);
  const [doorWidth, setDoorWidth] = useState("double door");

  const handleClosed = () => setOpen(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setDoorWidth(e.target.value);
  };

  const containerRef = useRef(null);
  const [draggingHandle, setDraggingHandle] = useState(null);
  const [isDraggingDoor, setIsDraggingDoor] = useState(false);
  const [dragStartOffset, setDragStartOffset] = useState(null);
  const [imageTransform, setImageTransform] = useState(
    "matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1)"
  );
  const [houseImageDimensions, setHouseImageDimensions] = useState({
    width: 840,
    height: 580,
  });

  const initialDoorWidth = 225;
  const initialDoorHeight = 100;

  
  useEffect(() => {
    if (image && points.length === 4) {
      const srcPoints = [
        { x: 0, y: 0 },
        { x: initialDoorWidth, y: 0 },
        { x: initialDoorWidth, y: initialDoorHeight },
        { x: 0, y: initialDoorHeight },
      ];
      const transform = getPerspectiveTransformMatrix(srcPoints, points);
      setImageTransform(transform);
    }
  }, [points, image, initialDoorWidth, initialDoorHeight]);

  const getMousePositionInContainer = (clientX, clientY) => {
    if (!containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(clientX - rect.left, rect.width)),
      y: Math.max(0, Math.min(clientY - rect.top, rect.height)),
    };
  };

  const handleMouseDownOnHandle = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingHandle(id);
    setIsDraggingDoor(false);
  };

  const handleMouseDownOnDoor = (e) => {
    if (draggingHandle !== null) return;
    e.preventDefault();
    const mousePos = getMousePositionInContainer(e.clientX, e.clientY);
    if (!mousePos || points.length !== 4) return;

    setDragStartOffset({
      x: mousePos.x - points[0].x,
      y: mousePos.y - points[0].y,
    });
    setIsDraggingDoor(true);
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!containerRef.current) return;

      let clientX, clientY;
      if (e instanceof MouseEvent) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else if (e.touches && e.touches[0]) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        return;
      }

      const mousePos = getMousePositionInContainer(clientX, clientY);
      if (!mousePos) return;

      if (draggingHandle !== null) {
        const newPoints = [...points];
        newPoints[draggingHandle] = { x: mousePos.x, y: mousePos.y };
        setPoints(newPoints);
      } else if (isDraggingDoor && dragStartOffset && points.length === 4) {
        const dx = mousePos.x - (points[0].x + dragStartOffset.x);
        const dy = mousePos.y - (points[0].y + dragStartOffset.y);

        const newPoints = points.map((point) => ({
          x: point.x + dx,
          y: point.y + dy,
        }));
        setPoints(newPoints);
      }
    },
    [draggingHandle, isDraggingDoor, points, dragStartOffset]
  );

  const handleMouseUp = useCallback(() => {
    setDraggingHandle(null);
    setIsDraggingDoor(false);
    setDragStartOffset(null);
  }, []);

  useEffect(() => {
    const currentMouseMove = (e) => handleMouseMove(e);
    const currentTouchMove = (e) => handleMouseMove(e);
    const currentMouseUp = () => handleMouseUp();
    const currentTouchEnd = () => handleMouseUp();

    if (draggingHandle !== null || isDraggingDoor) {
      document.addEventListener("mousemove", currentMouseMove);
      document.addEventListener("touchmove", currentTouchMove, {
        passive: false,
      });
      document.addEventListener("mouseup", currentMouseUp);
      document.addEventListener("touchend", currentTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", currentMouseMove);
      document.removeEventListener("touchmove", currentTouchMove);
      document.removeEventListener("mouseup", currentMouseUp);
      document.removeEventListener("touchend", currentTouchEnd);
    };
  }, [draggingHandle, isDraggingDoor, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (backImage) {
      // console.log("back img: ", backImage);

      setBgKonvaImage(backImage);
      // console.log(img)
      setTimeout(() => {
        handleGenerateImage();
      }, 200);
    }
  }, [backImage]);

  const selectgalleryimage = (imgUrl) => {
    // console.log("galley" ,imgUrl)
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.referrerPolicy = "no-referrer";
    img.src = imgUrl;

    img.onload = () => {
      setBackImage(img.src);

      // Set points based on image type
      if (imgUrl.includes("Platinum")) {
        setPoints([
          { x: 405, y: 313 },
          { x: 660, y: 316 },
          { x: 661, y: 426 },
          { x: 403, y: 422 },
        ]);
      } else if (imgUrl.includes("Roller Door")) {
        setPoints([
          { x: 451, y: 315 },
          { x: 781, y: 316 },
          { x: 778, y: 470 },
          { x: 452, y: 467 },
        ]);
      } else if (imgUrl.includes("section_hampton_windspray")) {
        setPoints([
          { x: 382, y: 262 },
          { x: 713, y: 264 },
          { x: 720, y: 476 },
          { x: 381, y: 477 },
        ]);
      } else if (imgUrl.includes("Sectional Door")) {
        setPoints([
          { x: 242, y: 343 },
          { x: 451, y: 346 },
          { x: 450, y: 468 },
          { x: 242, y: 466 },
        ]);
      } else if (imgUrl.includes("sectional_madison_monument_smooth_home")) {
        setPoints([
          { x: 339, y: 385 },
          { x: 539, y: 370 },
          { x: 537, y: 505 },
          { x: 340, y: 486 },
        ]);
      } else if (imgUrl.includes("sectional_madison_nightsky")) {
        setPoints([
          { x: 388, y: 243 },
          { x: 704, y: 252 },
          { x: 699, y: 482 },
          { x: 386, y: 485 },
        ]);
      } else if (imgUrl.includes("sectional_tuscan_dover_white")) {
        setPoints([
          { x: 412, y: 259 },
          { x: 661, y: 261 },
          { x: 659, y: 378 },
          { x: 409, y: 381 },
        ]);
      } else if (imgUrl.includes("Selections")) {
        setPoints([
          { x: 396, y: 331 },
          { x: 613, y: 329 },
          { x: 614, y: 435 },
          { x: 395, y: 437 },
        ]);
      } else {
        setPoints([
          { x: 250, y: 250 },
          { x: 550, y: 250 },
          { x: 550, y: 400 },
          { x: 250, y: 400 },
        ]);
      }
    };

    img.onerror = (e) => {
      console.error("Image failed to load", e);
    };
  };

  const openModal = () => {
    setOpen(true);
    handleClose();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  useEffect(() => {
    if (backImage) {
      applyDoorDesign();
    }
  }, [
    selectedRect, // Ensure it's set
    selectedColor,
    selectedPattern,
    selectedDesign,
    selectSeries,
    selectedPanelStyle,
    selctwindow,
    SelectedMaterial,
    bgKonvaImage,
  ]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new window.Image();

        img.onload = () => {
          setBackImage(event.target.result);
          // console.log("Image uploaded successfully: ",event.target.result);
          // applyDoorDesign();
        };

        img.src = event.target.result;
      };

      reader.readAsDataURL(file);
    }
  };

  const applyDoorDesign = async (
    color = selectedColor,
    pattern = selectedPattern,
    design = selectedDesign,
    series = selectSeries,
    panelStyle = selectedPanelStyle,
    windowstyle = selctwindow,
    material = SelectedMaterial
  ) => {
    const patternFill = await createPattern(
      color,
      pattern,
      design,
      series,
      panelStyle,
      windowstyle,
      material
    );
    if (patternFill) {
      setImage(patternFill);
      // console.log(patternFill)
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleGenerateImage();
    }, 150);

    return () => clearTimeout(timeout);
  }, [
    selectedColor,
    selectedPattern,
    selectedDesign,
    selectSeries,
    selectedPanelStyle,
    selctwindow,
    SelectedMaterial,
    points,
  ]);

  const doorstyle = [
    { id: 1, name: "roller", img: roller },
    { id: 2, name: "sectional", img: sectional },
  ];

  const doorseries = [
    { id: 1, name: "Essentials", img: sectional },
    { id: 2, name: "Native", img: native },
    { id: 3, name: "Selections Series", img: master },
  ];

  const essentialdoor = [
    { id: 1, name: "Oxford", img: sectional },
    { id: 2, name: "Hampton", img: hampton },
    { id: 3, name: "Madison", img: native },
    { id: 4, name: "Tuscan", img: native },
  ];

  const nativedoor = [
    { id: 1, name: "Madison", img: native },
    { id: 2, name: "Tuscan", img: native },
  ];

  const panel = [
    { id: 1, name: "Alumicomp", img: master },
    { id: 2, name: "SolidSheet", img: master },
  ];

  const Alumicomp = [
    { id: 1, name: "Sovereign", img: master },
    { id: 2, name: "Caesar", img: caeser },
    { id: 3, name: "Sultan", img: sultan },
    { id: 4, name: "Baron", img: baron },
    { id: 5, name: "Royal (L)", img: royall },
    { id: 6, name: "Royal (R)", img: royalr },
  ];

  const SolidSheet = [
    { id: 1, name: "Sovereign", img: master },
    { id: 2, name: "Caesar", img: caeser },
    { id: 3, name: "Sultan", img: sultan },
    { id: 4, name: "Baron", img: baron },
    { id: 5, name: "Royal (L)", img: royall },
    { id: 6, name: "Royal (R)", img: royalr },
    { id: 7, name: "Regent", img: regent },
  ];

  const colourbond = [
    { id: 1, name: "Manor Red", bgcolor: "#5f1d0f" },
    { id: 2, name: "Pale Eucalypt", bgcolor: "#7c856a" },
    { id: 3, name: "Cottage Green", bgcolor: "#304c3d" },
    { id: 4, name: "Deep Ocean", bgcolor: "#364252" },
    { id: 5, name: "Ironstone", bgcolor: "#3f434c" },
    { id: 6, name: "Night Sky", bgcolor: "#000000" },
    { id: 7, name: "Monument", bgcolor: "#323234" },
    { id: 8, name: "Woodland Grey", bgcolor: "#4b4c46" },
    { id: 9, name: "Basalt", bgcolor: "#6d6d6f" },
    { id: 10, name: "Wallaby", bgcolor: "#7f7c77" },
    { id: 11, name: "Jasper", bgcolor: "#6d6153" },
    { id: 12, name: "Gully", bgcolor: "#857f73" },
    { id: 13, name: "Windspray", bgcolor: "#898b8a" },
    { id: 14, name: "Bluegum", bgcolor: "#969799" },
    { id: 15, name: "Paperbark", bgcolor: "#cabea4" },
    { id: 16, name: "Dune", bgcolor: "#b1ada2" },
    { id: 17, name: "Southerly", bgcolor: "#d2d1cc" },
    { id: 18, name: "Evening Haze", bgcolor: "#c4c2a9" },
    { id: 19, name: "Surfmist", bgcolor: "#e4e2d5" },
    { id: 20, name: "Dover White", bgcolor: "#f9fbf0" },
    { id: 21, name: "Classic Cream", bgcolor: "#e9dcb9" },
    { id: 22, name: "Shale Grey", bgcolor: "#bdbfba" },
  ];

  const platinum = [
    { id: 1, name: "Zinc graphite", bgcolor: "#3f3f3b" },
    { id: 2, name: "Silver Quartz", bgcolor: "#b1b1b1" },
    { id: 3, name: "Midnight Matt", bgcolor: "#1c1a1b" },
  ];

  // const colourgrain = [
  //   { id: 1, name: "Dark Brown", bgcolor: "#693505" },
  //   { id: 2, name: "Deep Reddish Brown", bgcolor: "#633135" },
  //   { id: 3, name: "Medium Copper", bgcolor: "#B2652B" },
  // ];

  const nativecolour = [
    { id: 1, name: "Maple Dark", bgcolor: "#632b0a" },
    { id: 2, name: "Cedar", bgcolor: "#723905" },
    { id: 3, name: "Merbu Dark", bgcolor: "#62350c" },
    { id: 4, name: "Jarrah", bgcolor: "#3a0d0d" },
    { id: 5, name: "Iceberg", bgcolor: "#BCAC9C" },
    { id: 6, name: "Storm", bgcolor: "#666666" },
    // { id: 7, name: "Walnut", bgcolor: "#5C3A21" },
    // { id: 8, name: "Caoba", bgcolor: "#803C2D" },
  ];

  const composite = [
    { id: 1, name: "Muted Gold", bgcolor: "#9b8c50" },
    { id: 2, name: "Silver", bgcolor: "#aaaaaa" },
    { id: 3, name: "Tawny", bgcolor: "#99704f" },
    { id: 4, name: "Almost Black", bgcolor: "#181818" },
    { id: 5, name: "Warm Taupe", bgcolor: "#a5a098" },
    { id: 6, name: "Burnt Orange", bgcolor: "#9b571a" },
    { id: 7, name: "Off-White", bgcolor: "#eeeeee" },
    { id: 8, name: "Gunmetal", bgcolor: "#383838" },
  ];

  const oxfordwindow = [
    { id: 1, name: "Centerbury", img: centerburyOxford },
    { id: 2, name: "County", img: countryOxford },
    { id: 3, name: "Cascade", img: cascade },
    { id: 4, name: "Sunset", img: sunset },
    { id: 5, name: "Sunburst", img: sunburst },
    { id: 6, name: "Traditional", img: traditional },
    { id: 7, name: "Waterton", img: waterton },
  ];

  const hamptonwindow = [
    { id: 1, name: "Centerbury", img: centerbury },
    { id: 2, name: "County", img: country },
    { id: 3, name: "Cascade", img: cascade },
    { id: 4, name: "Horizon", img: sunset },
    { id: 5, name: "Sunburst", img: sunburst },
    { id: 6, name: "Traditional", img: traditional },
    { id: 7, name: "Waterton", img: waterton },
  ];

  const material = [{ id: 1, name: "Composite", img: compositeimg }];

  const solidmaterial = [
    { id: 1, name: "Composite", img: compositeimg },
    { id: 2, name: "Mini Orb", img: miniorb },
    { id: 3, name: "Honeycomb", img: honeycomb },
    { id: 4, name: "Polycarbonate", img: compositeimg },
    { id: 5, name: "Aluminium", img: aluminium },
  ];

  const handleSaveImage = () => {
    const displayArea = document.getElementById("image-display-area");
    if (!displayArea) return;

    // Step 1: Ensure all images are loaded
    const images = displayArea.querySelectorAll("img");
    const promises = Array.from(images).map((img) => {
      return new Promise((resolve) => {
        if (img.complete) return resolve(true);
        img.onload = img.onerror = () => resolve(true);
      });
    });

    // Step 2: Temporarily show draggable points
    Promise.all(promises).then(() => {
      requestAnimationFrame(() => {
        html2canvas(displayArea, {
          logging: false,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
          scale: window.devicePixelRatio,
        })
          .then((canvas) => {
            const image = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = image;
            link.download = "glideroll.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
          .catch((err) => {
            console.error("Error saving image:", err);
          })
          .finally(() => {
            setShowHandles(true); // 🔁 hide again if needed
          });
      });
    });
  };

  const resetToDefault = () => {
    setColorName("Manor Red");
    setSelectedPattern("roller");
    setSelectedDesign("");
    setSelectedColor("#5f1d0f");
    setPanelStyle("");
    setSelectseries("");
    setSelectWindow("");
    handleClose();
  };

  const handleGenerateImage = () => {
    const displayArea = document.getElementById("image-display-area");
    if (!displayArea) return;

    html2canvas(displayArea, {
      logging: false,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      scale: window.devicePixelRatio,
    })
      .then((canvas) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setImgurl(url); // You get a regular blob URL here, not base64
            console.log(url);
          }
        }, "image/png");
      })
      .catch((err) => {
        console.error("Error generating image:", err);
      });
  };

  return (
    <>
      {/* <Header /> */}
      <section className="customise mt-3">
        <div className="container">
          <div className="row">
            <div
              className="col-md-4 pt-2 pb-4"
              style={{ backgroundColor: "#f8f8f8", borderRadius: "3px" }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <h4>Design Centre</h4>
                <div className="d-flex align-items-center">
                  <button
                    className="btn save-btn d-flex align-items-center"
                    onClick={() => handleSaveImage(image, backImage)}
                  >
                    <SaveAltIcon className="me-2" />
                    SAVE
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center menu-btn mt-2">
                <button className="btn" onClick={resetToDefault}>
                  <LoopIcon /> Start Again
                </button>
                <button
                  className="btn"
                  onClick={() => fileInputRef.current.click()}
                >
                  <CloudUploadIcon /> Upload
                </button>
                <button className="btn" onClick={openModal}>
                  <CollectionsIcon /> Gallery
                </button>
              </div>
              <hr />
              <Box>
                <ToggleButtonGroup
                  value={view}
                  exclusive
                  onChange={handleViewChange}
                  aria-label="View Toggle"
                  sx={{ mb: 2 }}
                  className="info-btn"
                >
                  <ToggleButton value="detail" className="info-btn">
                    Details
                  </ToggleButton>
                  <ToggleButton value="style" className="info-btn">
                    Style & Color
                  </ToggleButton>
                  <ToggleButton value="customisation" className="info-btn">
                    Customisation
                  </ToggleButton>
                </ToggleButtonGroup>

                {view === "detail" && (
                  <>
                    <div className="details-box">
                      <div>
                        <p className="mb-1">Your Door Width</p>
                        <select value={doorWidth} onChange={handleChange}>
                          <option value="double door">Double Door</option>
                          <option value="single door">Single Door</option>
                        </select>
                      </div>
                      {/* <div className="mt-3">
                        <p className="mb-1">Door Style</p>
                        <select>
                          <option value="double">
                            Safe T. Glide Sectional Door
                          </option>
                          <option value="single">Single Door</option>
                        </select>
                      </div> */}
                      {selectedPattern === "sectional" && (
                        <div className="">
                          <p className="mb-1">Series</p>
                          <p className="dynamic-p">{selectSeries}</p>
                        </div>
                      )}
                      <div className="mt-3">
                        <p className="mb-1">Door Design</p>
                        <p className="dynamic-p">
                          {selectedDesign || "Roller"}
                        </p>
                      </div>
                      <div className="mt-3">
                        <p className="mb-1">Door Colour</p>
                        <p className="dynamic-p">{colorname}</p>
                      </div>
                    </div>
                  </>
                )}
                {view === "style" && (
                  <>
                    <h5>Select Your Door Style</h5>
                    <div className="d-flex align-items-center mt-2">
                      {doorstyle &&
                        doorstyle.map((pattern) => (
                          <div
                            key={pattern.id}
                            className="d-grid selected-btn"
                            onClick={() =>
                              document
                                .getElementById(`pattern-${pattern.name}`)
                                .click()
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <input
                              className="hidden-radio"
                              type="radio"
                              name="pattern"
                              id={`pattern-${pattern.name}`}
                              value={pattern.name}
                              checked={selectedPattern === pattern.name}
                              onChange={() => {
                                setSelectedPattern(pattern.name);
                                applyDoorDesign(selectedColor, pattern.name);

                                if (pattern.name === "sectional") {
                                  setSelectseries("Essentials");
                                  setSelectedDesign("Oxford");
                                }
                                if (pattern.name === "roller") {
                                  setSelectseries("");
                                  setSelectedDesign("");
                                  setPanelStyle("");
                                  setSelectWindow("");
                                }
                              }}
                              style={{ width: "max-content" }}
                            />
                            <img
                              src={pattern.img}
                              alt={`pattern-${pattern.name}`}
                              className="img-fluid door-img ms-3"
                            />
                            <label htmlFor={`pattern-${pattern.name}`}>
                              {pattern.name.charAt(0).toUpperCase() +
                                pattern.name.slice(1)}
                            </label>
                          </div>
                        ))}
                    </div>

                    {/* door series */}
                    {selectedPattern === "sectional" && (
                      <>
                        <h5 className="mt-3">Select Your Door Series</h5>
                        <div className="d-flex align-items-center ">
                          {doorseries &&
                            doorseries.map((pattern) => (
                              <div
                                key={pattern.id}
                                className="d-grid selected-btn"
                                onClick={() =>
                                  document
                                    .getElementById(`pattern-${pattern.name}`)
                                    .click()
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <input
                                  className="hidden-radio"
                                  type="radio"
                                  name="series"
                                  id={`pattern-${pattern.name}`}
                                  value={pattern.name}
                                  checked={selectSeries === pattern.name}
                                  onChange={() => {
                                    const newSeries = pattern.name;
                                    let newDesign = selectedDesign;
                                    let newPanelStyle = selectedPanelStyle;
                                    let newWindowStyle = selctwindow;
                                    let newmaterial = SelectedMaterial;

                                    if (newSeries === "Essentials") {
                                      newDesign = "Oxford";
                                      newPanelStyle = "";
                                    } else if (newSeries === "Native") {
                                      newDesign = "Madison";
                                      newPanelStyle = "";
                                      newWindowStyle = "";
                                    } else if (
                                      newSeries === "Selections Series"
                                    ) {
                                      newPanelStyle = "Alumicomp";
                                      newDesign = "Sovereign";
                                      newWindowStyle = "";
                                      newmaterial = "Composite";
                                    }

                                    setSelectseries(newSeries);
                                    setSelectedDesign(newDesign);
                                    setPanelStyle(newPanelStyle);
                                    setSelectWindow(newWindowStyle);
                                    setSelectedMaterial(newmaterial);

                                    // Pass the latest values immediately
                                    applyDoorDesign(
                                      selectedColor,
                                      newSeries,
                                      newDesign,
                                      newPanelStyle,
                                      newWindowStyle,
                                      newmaterial
                                    );
                                  }}
                                  style={{ width: "max-content" }}
                                />
                                <img
                                  src={pattern.img}
                                  alt={`pattern-${pattern.name}`}
                                  className="img-fluid door-img ms-3"
                                />
                                <label htmlFor={`pattern-${pattern.name}`}>
                                  {pattern.name.charAt(0).toUpperCase() +
                                    pattern.name.slice(1)}
                                </label>
                              </div>
                            ))}
                        </div>
                      </>
                    )}

                    {/* Door Design */}
                    {selectSeries === "Essentials" && (
                      <>
                        <h5 className="mt-3">Select Your Door Design</h5>
                        <div className="d-flex align-items-center flex-wrap mt-2">
                          {essentialdoor &&
                            essentialdoor.map((pattern) => (
                              <div
                                key={pattern.id}
                                className="d-grid selected-btn "
                                onClick={() =>
                                  document
                                    .getElementById(`pattern-${pattern.name}`)
                                    .click()
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <input
                                  className="hidden-radio"
                                  type="radio"
                                  name="design"
                                  id={`pattern-${pattern.name}`}
                                  value={pattern.name}
                                  // checked={selectedPattern === pattern}
                                  checked={selectedDesign === pattern.name}
                                  onChange={() => {
                                    setSelectedDesign(pattern.name);
                                    applyDoorDesign(
                                      selectedColor,
                                      pattern.name
                                    );

                                    if (selectedDesign === "Madison") {
                                      setSelectWindow("");
                                    }
                                    if (selectedDesign === "Tuscan") {
                                      setSelectWindow("");
                                    }
                                  }}
                                  style={{ width: "max-content" }}
                                />
                                <img
                                  src={pattern.img}
                                  alt={`pattern-${pattern.name}`}
                                  className="img-fluid door-img ms-3"
                                />
                                <label htmlFor={`pattern-${pattern.name}`}>
                                  {pattern.name.charAt(0).toUpperCase() +
                                    pattern.name.slice(1)}
                                </label>
                              </div>
                            ))}
                        </div>
                      </>
                    )}

                    {selectSeries === "Native" && (
                      <>
                        <h5 className="mt-3">Select Your Door Design</h5>
                        <div className="d-flex align-items-center flex-wrap mt-2">
                          {nativedoor &&
                            nativedoor.map((pattern) => (
                              <div
                                key={pattern.id}
                                className="d-grid selected-btn"
                                onClick={() =>
                                  document
                                    .getElementById(`pattern-${pattern.name}`)
                                    .click()
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <input
                                  className="hidden-radio"
                                  type="radio"
                                  name="design"
                                  id={`pattern-${pattern.name}`}
                                  value={pattern.name}
                                  checked={selectedDesign === pattern.name}
                                  onChange={() => {
                                    setSelectedDesign(pattern.name);
                                    applyDoorDesign(
                                      selectedColor,
                                      pattern.name
                                    );

                                    if (selectedDesign === "Madison") {
                                      setSelectWindow("");
                                    }
                                    if (selectedDesign === "Tuscan") {
                                      setSelectWindow("");
                                    }
                                  }}
                                  style={{ width: "max-content" }}
                                />
                                <img
                                  src={pattern.img}
                                  alt={`pattern-${pattern.name}`}
                                  className="img-fluid door-img ms-3"
                                />
                                <label htmlFor={`pattern-${pattern.name}`}>
                                  {pattern.name.charAt(0).toUpperCase() +
                                    pattern.name.slice(1)}
                                </label>
                              </div>
                            ))}
                        </div>
                      </>
                    )}

                    {selectSeries === "Selections Series" && (
                      <>
                        <h5 className="mt-3">Select Your Panel Style</h5>
                        <div className="d-flex align-items-center flex-wrap mt-2">
                          {panel &&
                            panel.map((pattern) => (
                              <div
                                key={pattern.id}
                                className="d-grid selected-btn "
                                onClick={() =>
                                  document
                                    .getElementById(`pattern-${pattern.name}`)
                                    .click()
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <input
                                  className="hidden-radio"
                                  type="radio"
                                  name="panelstyle"
                                  id={`pattern-${pattern.name}`}
                                  value={pattern.name}
                                  checked={selectedPanelStyle === pattern.name}
                                  onChange={() => {
                                    setPanelStyle(pattern.name);
                                    applyDoorDesign(
                                      selectedColor,
                                      pattern.name
                                    );
                                    if (pattern.name === "Alumicomp") {
                                      setSelectedDesign("Sovereign");
                                      setSelectedMaterial("Composite");
                                    }
                                  }}
                                  style={{ width: "max-content" }}
                                />
                                <img
                                  src={pattern.img}
                                  alt={`pattern-${pattern.name}`}
                                  className="img-fluid door-img ms-3"
                                />
                                <label htmlFor={`pattern-${pattern.name}`}>
                                  {pattern.name.charAt(0).toUpperCase() +
                                    pattern.name.slice(1)}
                                </label>
                              </div>
                            ))}
                        </div>
                      </>
                    )}

                    {selectedPanelStyle === "Alumicomp" && (
                      <>
                        <h5 className="mt-3">Select Your Door Design</h5>
                        <div className="d-flex align-items-center flex-wrap mt-2">
                          {Alumicomp &&
                            Alumicomp.map((pattern) => (
                              <div
                                key={pattern.id}
                                className="d-grid selected-btn "
                                onClick={() =>
                                  document
                                    .getElementById(`pattern-${pattern.name}`)
                                    .click()
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <input
                                  className="hidden-radio"
                                  type="radio"
                                  name="design"
                                  id={`pattern-${pattern.name}`}
                                  value={pattern.name}
                                  checked={selectedDesign === pattern.name}
                                  onChange={() => {
                                    setSelectedDesign(pattern.name);
                                    applyDoorDesign(
                                      selectedColor,
                                      pattern.name
                                    );
                                  }}
                                  style={{ width: "max-content" }}
                                />
                                <img
                                  src={pattern.img}
                                  alt={`pattern-${pattern.name}`}
                                  className="img-fluid door-img ms-3"
                                />
                                <label htmlFor={`pattern-${pattern.name}`}>
                                  {pattern.name.charAt(0).toUpperCase() +
                                    pattern.name.slice(1)}
                                </label>
                              </div>
                            ))}
                        </div>
                      </>
                    )}

                    {selectedPanelStyle === "SolidSheet" && (
                      <>
                        <h5 className="mt-3">Select Your Door Design</h5>
                        <div className="d-flex align-items-center flex-wrap mt-2">
                          {SolidSheet &&
                            SolidSheet.map((pattern) => (
                              <div
                                key={pattern.id}
                                className="d-grid selected-btn "
                                onClick={() =>
                                  document
                                    .getElementById(`pattern-${pattern.name}`)
                                    .click()
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <input
                                  className="hidden-radio"
                                  type="radio"
                                  name="design"
                                  id={`pattern-${pattern.name}`}
                                  value={pattern.name}
                                  checked={selectedDesign === pattern.name}
                                  onChange={() => {
                                    setSelectedDesign(pattern.name);
                                    applyDoorDesign(
                                      selectedColor,
                                      pattern.name
                                    );
                                  }}
                                  style={{ width: "max-content" }}
                                />
                                <img
                                  src={pattern.img}
                                  alt={`pattern-${pattern.name}`}
                                  className="img-fluid door-img ms-3"
                                />
                                <label htmlFor={`pattern-${pattern.name}`}>
                                  {pattern.name.charAt(0).toUpperCase() +
                                    pattern.name.slice(1)}
                                </label>
                              </div>
                            ))}
                        </div>
                      </>
                    )}

                    {selectedPanelStyle === "Alumicomp" && (
                      <>
                        <h5 className="mt-3">Material</h5>
                        <div className="d-flex align-items-center flex-wrap mt-2">
                          {material &&
                            material.map((pattern) => (
                              <div
                                key={pattern.id}
                                className="d-grid selected-btn "
                                onClick={() =>
                                  document
                                    .getElementById(`material-${pattern.name}`)
                                    .click()
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <input
                                  className="hidden-radio"
                                  type="radio"
                                  name="material"
                                  id={`material-${pattern.name}`}
                                  value={pattern.name}
                                  checked={SelectedMaterial === pattern.name}
                                  onChange={() => {
                                    setSelectedMaterial(pattern.name);
                                    applyDoorDesign(
                                      selectedColor,
                                      pattern.name
                                    );
                                  }}
                                  style={{ width: "max-content" }}
                                />
                                <img
                                  src={pattern.img}
                                  alt={`material-${pattern.name}`}
                                  className="img-fluid door-img ms-3"
                                />
                                <label htmlFor={`material-${pattern.name}`}>
                                  {pattern.name.charAt(0).toUpperCase() +
                                    pattern.name.slice(1)}
                                </label>
                              </div>
                            ))}
                        </div>
                      </>
                    )}

                    {selectedPanelStyle === "SolidSheet" && (
                      <>
                        <h5 className="mt-3">Solid Sheet Material</h5>
                        <div className="d-flex align-items-center flex-wrap mt-2">
                          {solidmaterial &&
                            solidmaterial.map((pattern) => (
                              <div
                                key={pattern.id}
                                className="d-grid selected-btn "
                                onClick={() =>
                                  document
                                    .getElementById(`material-${pattern.name}`)
                                    .click()
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <input
                                  className="hidden-radio"
                                  type="radio"
                                  name="material"
                                  id={`material-${pattern.name}`}
                                  value={pattern.name}
                                  checked={SelectedMaterial === pattern.name}
                                  onChange={() => {
                                    setSelectedMaterial(pattern.name);
                                    applyDoorDesign(
                                      selectedColor,
                                      pattern.name
                                    );
                                  }}
                                  style={{ width: "max-content" }}
                                />
                                <img
                                  src={pattern.img}
                                  alt={`material-${pattern.name}`}
                                  className="img-fluid door-img ms-3"
                                />
                                <label htmlFor={`material-${pattern.name}`}>
                                  {pattern.name.charAt(0).toUpperCase() +
                                    pattern.name.slice(1)}
                                </label>
                              </div>
                            ))}
                        </div>
                      </>
                    )}

                    {selectSeries !== "Native" &&
                      selectedPanelStyle !== "Alumicomp" && (
                        <>
                          <h5 className="mt-3">Select Your Door Colour</h5>
                          <h6>Colourbond</h6>
                          <div className="d-flex align-items-center flex-wrap">
                            {colourbond.map((color) => (
                              <div key={color.id} className="me-3 colors1">
                                <input
                                  className="hidden-color"
                                  type="radio"
                                  name="color"
                                  hidden
                                  id={`color-${color.id}`}
                                  value={color.bgcolor}
                                  checked={selectedColor === color.bgcolor}
                                  onChange={() => {
                                    setSelectedColor(color.bgcolor);
                                    setColorName(color.name);
                                    if (selectedRect) {
                                      applyDoorDesign(
                                        color.bgcolor,
                                        selectedPattern
                                      );
                                    }
                                  }}
                                />
                                <label
                                  className="color-label"
                                  htmlFor={`color-${color.id}`}
                                  style={{
                                    backgroundColor: color.bgcolor,
                                  }}
                                ></label>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    {selectSeries === "Native" &&
                      selectSeries !== "Selections Series" &&
                      selectSeries !== "essential" && (
                        <>
                          <h5 className="mt-3">Select Your Door Colour</h5>
                          <h6>Native Series</h6>
                          <div className="d-flex align-items-center flex-wrap">
                            {nativecolour &&
                              nativecolour.map((color) => (
                                <div key={color.id} className="me-3 colors1">
                                  <input
                                    type="radio"
                                    hidden
                                    name="colors"
                                    id={`composite-${color.id}`}
                                    className="hidden-color"
                                    value={color.bgcolor}
                                    checked={selectedColor === color.bgcolor}
                                    onChange={() => {
                                      setSelectedColor(color.bgcolor);
                                      setColorName(color.name);
                                      if (selectedRect) {
                                        applyDoorDesign(
                                          color.bgcolor,
                                          selectedPattern
                                        );
                                      }
                                    }}
                                  />
                                  <label
                                    className="color-label composite"
                                    htmlFor={`composite-${color.id}`}
                                    style={{
                                      backgroundColor: color.bgcolor,
                                    }}
                                  ></label>
                                </div>
                              ))}
                          </div>
                        </>
                      )}

                    {selectSeries !== "Native" &&
                      selectSeries !== "essential" &&
                      selectSeries === "Selections Series" && (
                        <>
                          <h5 className="mt-3">Select Your Material Colour</h5>
                          <h6>Composite</h6>
                          <div className="d-flex align-items-center flex-wrap">
                            {composite &&
                              composite.map((color) => (
                                <div key={color.id} className="me-3 colors1">
                                  <input
                                    type="radio"
                                    hidden
                                    name="colors"
                                    id={`composite-${color.id}`}
                                    className="hidden-color"
                                    value={color.bgcolor}
                                    checked={selectedColor === color.bgcolor}
                                    onChange={() => {
                                      setSelectedColor(color.bgcolor);
                                      setColorName(color.name);
                                      if (selectedRect) {
                                        applyDoorDesign(
                                          color.bgcolor,
                                          selectedPattern
                                        );
                                      }
                                    }}
                                  />
                                  <label
                                    className="color-label composite"
                                    htmlFor={`composite-${color.id}`}
                                    style={{
                                      backgroundColor: color.bgcolor,
                                    }}
                                  ></label>
                                </div>
                              ))}
                          </div>
                        </>
                      )}

                    {selectSeries !== "Native" &&
                      selectSeries !== "Selections Series" &&
                      (selectedDesign === "Madison" ||
                        selectedDesign === "Tuscan") && (
                        <>
                          <h6 className="mt-3">Platinum</h6>
                          <div className="d-flex align-items-center flex-wrap">
                            {platinum &&
                              platinum.map((color) => (
                                <div key={color.id} className="me-3 platinum">
                                  <input
                                    type="radio"
                                    hidden
                                    name="colors"
                                    id={`platinum-${color.id}`}
                                    className="hidden-color"
                                    value={color.bgcolor}
                                    checked={selectedColor === color.bgcolor}
                                    onChange={() => {
                                      setSelectedColor(color.bgcolor);
                                      setColorName(color.name);
                                      if (selectedRect) {
                                        applyDoorDesign(
                                          color.bgcolor,
                                          selectedPattern
                                        );
                                      }
                                    }}
                                  />
                                  <label
                                    className="color-label composite"
                                    htmlFor={`platinum-${color.id}`}
                                    style={{ backgroundColor: color.bgcolor }}
                                  ></label>
                                </div>
                              ))}
                          </div>
                        </>
                      )}
                  </>
                )}

                {view === "customisation" && (
                  <>
                    <h5>Window Options</h5>
                    {selectedDesign === "Oxford" && (
                      <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <div className="w-100 d-flex window-box flex-wrap">
                          {oxfordwindow &&
                            oxfordwindow.map((window) => (
                              <div
                                className="mb-3 mt-3 justify-content-center"
                                style={{ width: "45%" }}
                              >
                                <div
                                  className="d-grid selected-window "
                                  onClick={() =>
                                    document
                                      .getElementById(`${window.name}`)
                                      .click()
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  <input
                                    type="radio"
                                    name="windowType"
                                    id={window.name}
                                    style={{ width: "max-content" }}
                                    className="hidden-radio"
                                    checked={selctwindow === window.name}
                                    onChange={() =>
                                      setSelectWindow(window.name)
                                    }
                                  />
                                  <img
                                    src={window.img}
                                    alt="centerbury"
                                    className="img-fluid window-img ms-1"
                                  />
                                  <label htmlFor="centerbury">
                                    {window.name}
                                  </label>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {selectedDesign === "Hampton" && (
                      <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <div className="w-100 d-flex window-box flex-wrap">
                          {hamptonwindow &&
                            hamptonwindow.map((window) => (
                              <div
                                className="mb-3 mt-3 justify-content-center"
                                style={{ width: "45%" }}
                              >
                                <div
                                  className="d-grid selected-window "
                                  onClick={() =>
                                    document
                                      .getElementById(`${window.name}`)
                                      .click()
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  <input
                                    type="radio"
                                    name="windowType"
                                    id={window.name}
                                    style={{ width: "max-content" }}
                                    className="hidden-radio"
                                    checked={selctwindow === window.name}
                                    onChange={() =>
                                      setSelectWindow(window.name)
                                    }
                                  />
                                  <img
                                    src={window.img}
                                    alt="centerbury"
                                    className="img-fluid window-img ms-1"
                                  />
                                  <label htmlFor="centerbury">
                                    {window.name}
                                  </label>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {selectedDesign !== "Hampton" &&
                      selectedDesign !== "Oxford" && (
                        <Alert severity="error" className="mb-2">
                          Sorry, this model is not available with windows
                        </Alert>
                      )}
                  </>
                )}
              </Box>
              <button className="btn mt-3 free-qoute" onClick={handleOpenModal}>
                CONTACT FOR FREE QUOTE
              </button>
              {isModalOpen && (
                <div className="contact-modal-overlay">
                  <div className="contact-modal-content">
                    <button
                      className="contact-modal-close"
                      onClick={handleCloseModal}
                      aria-label="Close contact form"
                    >
                      ✕
                    </button>
                    <ContactForm
                      // imagePath="/build/generated-image.jpg"
                      onClose={handleCloseModal}
                      series={selectSeries}
                      design={selectedDesign}
                      color={colorname}
                      style={selectedPanelStyle}
                      pattern={selectedPattern}
                      doorwidth={doorWidth}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="col-md-8 file">
              <div className="sticky-div">
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
                {!bgKonvaImage && (
                  <div
                    className="text-center mt-5 upload-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <CloudUploadIcon sx={{ fontSize: "40px" }} />
                    <p>Upload image</p>
                  </div>
                )}

                <div
                  ref={containerRef}
                  className="overflow-hidden position-relative"
                  id="image-display-area"
                  style={{ maxWidth: "840px", maxHeight: "580px" }}
                >
                  {/* Background Image */}
                  {bgKonvaImage && (
                    <img
                      src={bgKonvaImage}
                      alt="Background"
                      onLoad={(e) => {
                        const target = e.target;
                        setHouseImageDimensions({
                          width: target.naturalWidth,
                          height: target.naturalHeight,
                        });
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        // objectFit: "cover",
                        display: "block",
                      }}
                    />
                  )}

                  {/* Door Overlay */}
                  {image && (
                    <div
                      className="position-absolute"
                      style={{
                        width: `${initialDoorWidth}px`,
                        height: `${initialDoorHeight}px`,
                        transformOrigin: "0 0",
                        transform: imageTransform,
                        backfaceVisibility: "hidden",
                        willChange: "transform",
                        cursor: isDraggingDoor ? "grabbing" : "grab",
                        top: 0,
                        touchAction: "none",
                      }}
                      onMouseDown={handleMouseDownOnDoor}
                      onTouchStart={handleMouseDownOnDoor}
                    >
                      <img
                        src={image}
                        alt="Selected door"
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "block",
                          pointerEvents: "none",
                          zIndex: 10,
                        }}
                      />
                    </div>
                  )}

                  {/* Draggable Handles */}
                  {showHandles &&
                    image &&
                    points.map((point, index) => (
                      <DraggableHandle
                        key={index}
                        id={index}
                        x={point.x}
                        y={point.y}
                        onMouseDown={handleMouseDownOnHandle}
                      />
                    ))}
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

export default Customise;
