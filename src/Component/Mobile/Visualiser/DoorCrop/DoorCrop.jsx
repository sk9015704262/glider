import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ImageContext } from "../../../Context/ImageContext";
import { useNavigate } from "react-router-dom";
import { getPerspectiveTransformMatrix } from "../../../lib/perspective-transform";
import DraggableHandle from "../../../Desktop/DraggableHandle";

function DoorCrop({ handleBack }) {
  const { cropImage, setSelectedDoor } = useContext(ImageContext);
  const navigate = useNavigate();
  const [points, setPoints] = useState([
    { x: 103, y: 167 }, // top-left
    { x: 206, y: 167 }, // top-right
    { x: 206, y: 225 }, // bottom-right
    { x: 103, y: 226 },
  ]);
  // console.log(points);
  const [image, setImage] = useState();
  const [bgKonvaImage, setBgKonvaImage] = useState(null);
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
  const initialDoorWidth = 225;
  const initialDoorHeight = 100;
  // console.log(points)

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
      // console.log(cropImage)
      setBgKonvaImage(cropImage);
      setImage(cropImage);
      // Set points based on image type
      if (cropImage.includes("Platinum")) {
        setPoints([
          { x: 194, y: 161 },
          { x: 321, y: 161 },
          { x: 319, y: 220 },
          { x: 194, y: 218 },
        ]);
      } else if (cropImage.includes("Roller Door")) {
        setPoints([
          { x: 221, y: 163 },
          { x: 375, y: 163 },
          { x: 374, y: 241 },
          { x: 218, y: 242 },
        ]);
      } else if (cropImage.includes("section_hampton_windspray")) {
        setPoints([
          { x: 184, y: 133 },
          { x: 348, y: 135 },
          { x: 345, y: 249 },
          { x: 188, y: 247 },
        ]);
      } else if (cropImage.includes("Sectional Door")) {
        setPoints([
          { x: 119, y: 181 },
          { x: 213, y: 181 },
          { x: 213, y: 240 },
          { x: 118, y: 238 },
        ]);
      } else if (cropImage.includes("sectional_madison_monument_smooth_home")) {
        setPoints([
          { x: 164, y: 204 },
          { x: 258, y: 188 },
          { x: 258, y: 259 },
          { x: 163, y: 249 },
        ]);
      } else if (cropImage.includes("sectional_madison_nightsky")) {
        setPoints([
          { x: 191, y: 131 },
          { x: 339, y: 129 },
          { x: 335, y: 250 },
          { x: 188, y: 247 },
        ]);
      } else if (cropImage.includes("sectional_tuscan_dover_white")) {
        setPoints([
          { x: 189, y: 133 },
          { x: 319, y: 133 },
          { x: 319, y: 195 },
          { x: 190, y: 193 },
        ]);
      } else if (cropImage.includes("Selections")) {
        setPoints([
          { x: 190, y: 170 },
          { x: 297, y: 169 },
          { x: 295, y: 222 },
          { x: 191, y: 225 },
        ]);
      } else {
        setPoints([
          { x: 103, y: 167 }, // top-left
          { x: 206, y: 167 }, // top-right
          { x: 206, y: 225 }, // bottom-right
          { x: 103, y: 226 },
        ]);
      }
    }
  }, [cropImage]);

  const saveSelectionPosition = () => {
    // console.log("Saved Selection Area:", points);
    setSelectedDoor(points);
    navigate("/costomising_door");
  };

  return (
    <>
      <p>Select your door area</p>
      {/* <div className="uploaded-image-container mb-3 text-center"> */}
      <div
        ref={containerRef}
        className="overflow-hidden position-relative"
        id="image-display-area"
        style={{ width: "100", height: "300px" }}
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
            onTouchStart={handleTouchStartOnDoor}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#00000069",
                position: "relative",
              }}
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
                  opacity: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
            </div>
          </div>
        )}

        {/* Draggable Handles */}
        {image &&
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

      {/* </div> */}
      <button
        className="btn continue mb-3 mt-5"
        onClick={saveSelectionPosition}
      >
        Select and Continue
      </button>
      <button className="btn back mb-3" onClick={handleBack}>
        Back
      </button>
    </>
  );
}

export default DoorCrop;
