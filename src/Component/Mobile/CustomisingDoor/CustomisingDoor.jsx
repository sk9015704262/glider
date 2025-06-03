import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Header from "../Dashboard/Header/Header";
import "./Customising.css";
import roller from "../../images/roller.svg";
import sectional from "../../images/sectional.svg";
import native from "../../images/native_icon.svg";
import master from "../../images/master_icon.svg";
import hampton from "../../images/hampton_icon.svg";
import caeser from "../../images/caesar_icon.svg";
import baron from "../../images/baron_icon.svg";
import sultan from "../../images/sultan_icon.svg";
import royall from "../../images/royal_l_icon.svg";
import royalr from "../../images/royal_r_icon.svg";
import regent from "../../images/regent_icon.svg";
import compositeimg from "../../images/composite.svg";
import miniorb from "../../images/mini_orb.svg";
import honeycomb from "../../images/honeycomb.svg";
import aluminium from "../../images/aluminium.svg";
import { ImageContext } from "../../Context/ImageContext";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Link } from "react-router-dom";
import { Alert } from "@mui/material";
import centerbury from "../../images/Centerbury.png";
import country from "../../images//Country.png";
import cascade from "../../images/cascade.png";
import sunset from "../../images/sunset.png";
import sunburst from "../../images/sunburst.png";
import traditional from "../../images/traditional.png";
import waterton from "../../images/waterton.png";
import ContactForm from "../../Shared/ContactForm/ContactForm";
import { createPattern } from "./MobilePattren";
import DraggableHandle from "../../Desktop/DraggableHandle";
import { getPerspectiveTransformMatrix } from "../../lib/perspective-transform";
import html2canvas from "html2canvas";

function CustomisingDoor() {
  const { cropImage, selectedDoor, setImgurl } = useContext(ImageContext);
  // const [selectedRect, setSelectedRect] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#5f1d0f");
  const [selectedPattern, setSelectedPattern] = useState("roller");
  const [selectedColorName, setSelectedColorName] = useState("Manor Red");
  const [SelectedMaterial, setSelectedMaterial] = useState("Composite");
  const [error, setError] = useState("");
  const [selectSeries, setSelectseries] = useState("");
  const [selectedDesign, setSelectedDesign] = useState("");
  const [PanelStyle, setPanelStyle] = useState("");
  const [selctwindow, setSelectWindow] = useState("");
  const [bgImage, setBgImage] = useState(null);
  const [image, setImage] = useState(null);
  const [showHandles, setShowHandles] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  // console.log("door position: ", selectedDoor);
  const [doorWidth, setDoorWidth] = useState("double door");

  const handleChangewidth = (e) => {
    setDoorWidth(e.target.value);
  };
  const [points, setPoints] = useState(
    selectedDoor || [
      { x: 150, y: 150 }, // top-left
      { x: 300, y: 150 }, // top-right
      { x: 300, y: 100 }, // bottom-right
      { x: 150, y: 100 }, // bottom-left
    ]
  );
  // console.log(selectedDoor)

  const initialDoorWidth = 225;
  const initialDoorHeight = 100;

  const containerRef = useRef(null);
  const [draggingHandle, setDraggingHandle] = useState(null);
  const [isDraggingDoor, setIsDraggingDoor] = useState(false);
  const [dragStartOffset, setDragStartOffset] = useState(null);
  const [imageTransform, setImageTransform] = useState(
    "matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1)"
  );
  const [houseImageDimensions, setHouseImageDimensions] = useState({
    width: 380,
    height: 400,
  });

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
    if (
      !containerRef.current ||
      typeof clientX !== "number" ||
      typeof clientY !== "number"
    )
      return null;

    const rect = containerRef.current.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(clientX - rect.left, rect.width)),
      y: Math.max(0, Math.min(clientY - rect.top, rect.height)),
    };
  };

  const handleTouchStartOnDoor = (e) => {
    e.preventDefault(); // Prevent scroll
    const touch = e.touches[0];
    handleMouseDownOnDoor({
      clientX: touch.clientX,
      clientY: touch.clientY,
      preventDefault: () => {},
      stopPropagation: () => {},
    });
  };

  const handleMouseDownOnHandle = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const mousePos = getMousePositionInContainer(clientX, clientY);
    if (!mousePos) return;

    setDraggingHandle(id);
    setIsDraggingDoor(false);
  };

  const handleMouseDownOnDoor = (e) => {
    if (draggingHandle !== null) return;

    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const mousePos = getMousePositionInContainer(clientX, clientY);
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
    [draggingHandle, isDraggingDoor, points, points, dragStartOffset]
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
      document.addEventListener("mouseup", currentMouseUp);
      document.addEventListener("touchmove", currentTouchMove, {
        passive: false,
      });
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
    if (cropImage) {
      // console.log("back img: ", backImage);
      setBgImage(cropImage);
      // console.log(img)
      setTimeout(() => {
        handleGenerateImage();
      }, 200);
    }
  }, [cropImage]);

  useEffect(() => {
    applyDoorDesign();
    // console.log(applyDoorDesign)
  }, [
    selectedColor,
    selectedPattern,
    selectedDesign,
    selectSeries,
    PanelStyle,
    selctwindow,
    SelectedMaterial,
  ]);

  const handleChange = (e) => {
    const selectedBgColor = e.target.value;
    if (!selectedBgColor) return;

    // Combine all colors into one array if they exist
    const allColors = [
      ...(colourbond || []),
      ...(platinum || []),
      ...(nativecolour || []),
      ...(composite || []),
    ];
    const selectedItem = allColors.find(
      (color) => color.bgcolor === selectedBgColor
    );

    if (selectedItem) {
      setSelectedColor(selectedItem.bgcolor);
      setSelectedColorName(selectedItem.name);
    }
  };

  // ------Door Design-------
  const applyDoorDesign = async (
    color = selectedColor,
    pattern = selectedPattern,
    design = selectedDesign,
    series = selectSeries,
    panelStyle = PanelStyle,
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
    // console.log(patternFill)
    if (patternFill) {
      setImage(patternFill);
    }
  };

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
      setShowHandles(false); 
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
    setSelectedColorName("Manor Red");
    setSelectedPattern("roller");
    setSelectedDesign("");
    setSelectedColor("#5f1d0f");
    setPanelStyle("");
    setSelectseries("");
    setSelectWindow("");
  };

  const windows = [
    { id: 1, name: "Canterbury", img: centerbury },
    { id: 2, name: "County", img: country },
    { id: 3, name: "Cascade", img: cascade },
    { id: 4, name: "Sunset", img: sunset },
    { id: 5, name: "Sunburst", img: sunburst },
    { id: 6, name: "Traditional", img: traditional },
    { id: 7, name: "Waterton", img: waterton },
  ];

  const handlewindow = (e) => {
    const windowvalue = e.target.value;
    setSelectWindow(windowvalue);
  };

  const handleGenerateImage = () => {
    const displayArea = document.getElementById("image-display-area");
    if (!displayArea) return;

    html2canvas(displayArea, {
      logging: false,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null, // Keep transparency if needed
      scale: window.devicePixelRatio, // High-res
    })
      .then((canvas) => {
        const dataUrl = canvas.toDataURL("image/png");
        setImgurl(dataUrl);
        // console.log(dataUrl)
      })
      .catch((err) => {
        // console.error("Error generating image:", err);
      });
  };

  return (
    <>
      <Header />
      <section className="customisingDoor mt-4 mb-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Customising Your Door</h1>
              <p className="door-text mt-4">Door Details</p>
              {!bgImage ? (
                <Link to="/visualiser" className="text-decoration-none">
                  <p className="upload-btn">
                    <CloudUploadIcon /> upload Image
                  </p>
                </Link>
              ) : (
                <div
                  ref={containerRef}
                  className="overflow-hidden position-relative"
                  id="image-display-area"
                  style={{ width: "100", height: "300px" }}
                >
                  {/* Background Image */}
                  {bgImage && (
                    <img
                      src={bgImage}
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
                      onTouchStart={handleTouchStartOnDoor}
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
                        onTouchStart={(e) => handleMouseDownOnHandle(e, index)}
                      />
                    ))}
                </div>
              )}

              <h5 className="mt-3">Select your door width</h5>
              <div className="selected mb-3">
                <select
                  value={doorWidth}
                  onChange={handleChangewidth}
                  className="color-select"
                >
                  <option value="double door">Double Door</option>
                  <option value="single door">Single Door</option>
                </select>
              </div>

              <div className="selected mb-3">
                <p className="mb-0 text-capitalize">
                  Door Style - {selectedPattern}
                </p>
              </div>
              <div className="selected mb-3">
                <p className="mb-0 text-capitalize">
                  Colour - Colorbond - {selectedColorName}
                </p>
              </div>

              <button className="btn start mb-3" onClick={resetToDefault}>
                Start Again
              </button>

              <h4 className="mb-3">Select Door Style</h4>
              {doorstyle &&
                doorstyle.map((pattern) => (
                  <div
                    key={pattern.id}
                    className="d-flex justify-content-between align-items-center selected-btn selected mb-2"
                    onClick={() =>
                      document.getElementById(`pattern-${pattern.name}`).click()
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={pattern.name === "roller" ? roller : sectional}
                        alt={pattern.name === "roller" ? "roller" : "sectional"}
                        className="img-fluid doorstyle-img me-2"
                      />
                      <label htmlFor={`pattern-${pattern.name}`}>
                        {pattern.name.charAt(0).toUpperCase() +
                          pattern.name.slice(1)}
                      </label>
                    </div>
                    <input
                      type="radio"
                      id={`pattern-${pattern.name}`}
                      name="doorStyle"
                      className="me-3"
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
                    />
                  </div>
                ))}

              {/* door series */}
              {selectedPattern === "sectional" && (
                <>
                  <h5 className="mt-3">Select Your Door Series</h5>
                  <div className="d-flex align-items-center justify-content-between flex-wrap">
                    {doorseries &&
                      doorseries.map((pattern) => (
                        <div
                          key={pattern.id}
                          className="d-grid selected-mbl-btn"
                          onClick={() =>
                            document
                              .getElementById(`pattern-${pattern.name}`)
                              .click()
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <input
                            hidden
                            className="hidden-radio"
                            type="radio"
                            name="series"
                            id={`pattern-${pattern.name}`}
                            value={pattern.name}
                            checked={selectSeries === pattern.name}
                            onChange={() => {
                              const newSeries = pattern.name;
                              let newDesign = selectedDesign;
                              let newPanelStyle = PanelStyle;
                              let newWindowStyle = selctwindow;
                              let newmaterial = SelectedMaterial;

                              if (newSeries === "Essentials") {
                                newDesign = "Oxford";
                                newPanelStyle = "";
                              } else if (newSeries === "Native") {
                                newDesign = "Madison";
                                newPanelStyle = "";
                                newWindowStyle = "";
                              } else if (newSeries === "Selections Series") {
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
                            className="img-fluid door-img"
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
                          className="d-grid selected-mbl-btn "
                          onClick={() =>
                            document
                              .getElementById(`pattern-${pattern.name}`)
                              .click()
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <input
                            hidden
                            className="hidden-radio"
                            type="radio"
                            name="design"
                            id={`pattern-${pattern.name}`}
                            value={pattern.name}
                            // checked={selectedPattern === pattern}
                            checked={selectedDesign === pattern.name}
                            onChange={() => {
                              setSelectedDesign(pattern.name);
                              applyDoorDesign(selectedColor, pattern.name);

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
                            className="img-fluid door-img "
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
                          className="d-grid selected-mbl-btn"
                          onClick={() =>
                            document
                              .getElementById(`pattern-${pattern.name}`)
                              .click()
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <input
                            hidden
                            className="hidden-radio"
                            type="radio"
                            name="design"
                            id={`pattern-${pattern.name}`}
                            value={pattern.name}
                            checked={selectedDesign === pattern.name}
                            onChange={() => {
                              setSelectedDesign(pattern.name);
                              applyDoorDesign(selectedColor, pattern.name);
                            }}
                            style={{ width: "max-content" }}
                          />
                          <img
                            src={pattern.img}
                            alt={`pattern-${pattern.name}`}
                            className="img-fluid door-img "
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
                          className="d-grid selected-mbl-btn "
                          onClick={() =>
                            document
                              .getElementById(`pattern-${pattern.name}`)
                              .click()
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <input
                            hidden
                            className="hidden-radio"
                            type="radio"
                            name="panelstyle"
                            id={`pattern-${pattern.name}`}
                            value={pattern.name}
                            checked={pattern.name === PanelStyle}
                            onChange={() => {
                              setPanelStyle(pattern.name);
                              applyDoorDesign(selectedColor, pattern.name);
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
                            className="img-fluid door-img"
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

              {PanelStyle === "Alumicomp" && (
                <>
                  <h5 className="mt-3">Select Your Door Design</h5>
                  <div className="d-flex align-items-center flex-wrap mt-2">
                    {Alumicomp &&
                      Alumicomp.map((pattern) => (
                        <div
                          key={pattern.id}
                          className="d-grid selected-mbl-btn "
                          onClick={() =>
                            document
                              .getElementById(`pattern-${pattern.name}`)
                              .click()
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <input
                            hidden
                            className="hidden-radio"
                            type="radio"
                            name="design"
                            id={`pattern-${pattern.name}`}
                            value={pattern.name}
                            checked={selectedDesign === pattern.name}
                            onChange={() => {
                              setSelectedDesign(pattern.name);
                              applyDoorDesign(selectedColor, pattern.name);
                            }}
                            style={{ width: "max-content" }}
                          />
                          <img
                            src={pattern.img}
                            alt={`pattern-${pattern.name}`}
                            className="img-fluid door-img "
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

              {PanelStyle === "SolidSheet" && (
                <>
                  <h5 className="mt-3">Select Your Door Design</h5>
                  <div className="d-flex align-items-center flex-wrap mt-2 ">
                    {SolidSheet &&
                      SolidSheet.map((pattern) => (
                        <div
                          key={pattern.id}
                          className="d-grid selected-mbl-btn "
                          onClick={() =>
                            document
                              .getElementById(`pattern-${pattern.name}`)
                              .click()
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <input
                            hidden
                            className="hidden-radio"
                            type="radio"
                            name="design"
                            id={`pattern-${pattern.name}`}
                            value={pattern.name}
                            checked={selectedDesign === pattern.name}
                            onChange={() => {
                              setSelectedDesign(pattern.name);
                              applyDoorDesign(selectedColor, pattern.name);
                            }}
                            style={{ width: "max-content" }}
                          />
                          <img
                            src={pattern.img}
                            alt={`pattern-${pattern.name}`}
                            className="img-fluid door-img "
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

              {PanelStyle === "Alumicomp" && (
                <>
                  <h5 className="mt-3">Material</h5>
                  <div className="d-flex align-items-center flex-wrap mt-2">
                    {material &&
                      material.map((pattern) => (
                        <div
                          key={pattern.id}
                          className="d-grid selected-btn selected-mbl-btn"
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
                              applyDoorDesign(selectedColor, pattern.name);
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

              {PanelStyle === "SolidSheet" && (
                <>
                  <h5 className="mt-3">Solid Sheet Material</h5>
                  <div className="d-flex align-items-center flex-wrap mt-2">
                    {solidmaterial &&
                      solidmaterial.map((pattern) => (
                        <div
                          key={pattern.id}
                          className="d-grid selected-btn selected-mbl-btn"
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
                              applyDoorDesign(selectedColor, pattern.name);
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

              {selectSeries !== "Native" && PanelStyle !== "Alumicomp" && (
                <>
                  <h5 className="mt-3">Select Colour</h5>
                  <h6>Colourbond</h6>
                  <div className="d-flex align-items-center flex-wrap">
                    <div className="selected mb-3 d-flex align-items-center">
                      {/* Selected Color Preview */}
                      <p
                        style={{
                          backgroundColor: selectedColor,
                          height: "22px",
                          width: "25px",
                          marginRight: "10px",
                        }}
                        className="mb-0"
                      ></p>
                      <select
                        className="color-select"
                        value={selectedColor}
                        onChange={handleChange}
                      >
                        <option value="">Select a color</option>
                        {colourbond &&
                          colourbond.map((color) => (
                            <option key={color.id} value={color.bgcolor}>
                              {color.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </>
              )}

              {selectSeries !== "Native" &&
                selectSeries !== "Selections Series" &&
                (selectedDesign === "Madison" ||
                  selectedDesign === "Tuscan") && (
                  <>
                    <h6>Platinum</h6>
                    <div className="d-flex align-items-center flex-wrap">
                      <div className="selected mb-3 d-flex align-items-center">
                        {/* Selected Color Preview */}
                        <p
                          style={{
                            backgroundColor: selectedColor,
                            height: "22px",
                            width: "25px",
                            marginRight: "10px",
                          }}
                          className="mb-0"
                        ></p>
                        <select
                          className="color-select"
                          value={selectedColor}
                          onChange={handleChange}
                        >
                          <option value="">Select a color</option>
                          {platinum &&
                            platinum.map((color) => (
                              <option key={color.id} value={color.bgcolor}>
                                {color.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}

              {/* {selectedPattern === "sectional" &&
                selectSeries !== "Native" &&
                selectSeries !== "Master" && (
                  <>
                    <h6 className="mt-3">Colourgrain</h6>
                    <div className="d-flex align-items-center flex-wrap">
                      <div className="selected mb-3 d-flex align-items-center">                       
                        <p
                          style={{
                            backgroundColor: selectedColor,
                            height: "22px",
                            width: "25px",
                            marginRight: "10px",
                          }}
                          className="mb-0"
                        ></p>
                        <select
                          className="color-select"
                          value={selectedColor}
                          onChange={handleChange}
                        >
                          <option value="">Select a color</option>
                          {colourgrain &&
                            colourgrain.map((color) => (
                              <option key={color.id} value={color.bgcolor}>
                                {color.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </>
                )} */}

              {selectSeries === "Native" &&
                selectSeries !== "Selections Series" &&
                selectSeries !== "essential" && (
                  <>
                    <h5 className="mt-3">Select Your Door Colour</h5>
                    <h6>Native Series</h6>
                    <div className="d-flex align-items-center flex-wrap">
                      <div className="selected mb-3 d-flex align-items-center">
                        {/* Selected Color Preview */}
                        <p
                          style={{
                            backgroundColor: selectedColor,
                            height: "22px",
                            width: "25px",
                            marginRight: "10px",
                          }}
                          className="mb-0"
                        ></p>
                        <select
                          className="color-select"
                          value={selectedColor}
                          onChange={handleChange}
                        >
                          <option value="">Select a color</option>
                          {nativecolour &&
                            nativecolour.map((color) => (
                              <option key={color.id} value={color.bgcolor}>
                                {color.name}
                              </option>
                            ))}
                        </select>
                      </div>
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
                      <div className="selected mb-3 d-flex align-items-center">
                        {/* Selected Color Preview */}
                        <p
                          style={{
                            backgroundColor: selectedColor,
                            height: "22px",
                            width: "25px",
                            marginRight: "10px",
                          }}
                          className="mb-0"
                        ></p>
                        <select
                          className="color-select"
                          value={selectedColor}
                          onChange={handleChange}
                        >
                          <option value="">Select a color</option>
                          {composite &&
                            composite.map((color) => (
                              <option key={color.id} value={color.bgcolor}>
                                {color.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}

              <div className="window-option">
                <h4 className="mb-3 mt-4">Window Option</h4>
                {selectedDesign === "Oxford" || selectedDesign === "Hampton" ? (
                  <select
                    className="selected"
                    value={selctwindow}
                    onChange={handlewindow}
                  >
                    {windows.map((window) => (
                      <option value={window.name} key={window.id}>
                        {window.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Alert severity="error" className="mb-2">
                    Sorry, this model is not available with windows
                  </Alert>
                )}
              </div>
            </div>

            <div className="save-btn-container mt-4">
              {error && (
                <Alert severity="error" className="mb-2">
                  {error}
                </Alert>
              )}
              <button className="btn save-btn " onClick={handleSaveImage}>
                {/* <SaveAltIcon className="me-2" /> */}
                Save Image
              </button>
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
                      imagePath="/build/generated-image.jpg" // 🔁 Replace with actual generated path
                      onClose={handleCloseModal}
                      series={selectSeries}
                      design={selectedDesign}
                      color={selectedColorName}
                      style={PanelStyle}
                      pattern={selectedPattern}
                      doorwidth={doorWidth}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CustomisingDoor;
