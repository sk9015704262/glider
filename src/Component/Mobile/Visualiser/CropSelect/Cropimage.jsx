// import React, { useContext, useEffect, useRef, useState } from "react";
// import { fabric } from "fabric";
// import { ImageContext } from "../../../Context/ImageContext";

// const Cropimage = ({ imageSrc, handleCropContinue, handleBack }) => {
//   // Receive imageSrc as a prop
//   const canvasRef = useRef(null);
//   const [canvas, setCanvas] = useState(null);
//   const [selectedRect, setSelectedRect] = useState(null);
//   const { setCropImages } = useContext(ImageContext);

//   useEffect(() => {
//     const fabricCanvas = new fabric.Canvas(canvasRef.current, {
//       width: 400,
//       height: 240,
//       backgroundColor: "#fdfdfd",
//     });
//     setCanvas(fabricCanvas);
//     return () => fabricCanvas.dispose();
//   }, []);

//   useEffect(() => {
//     if (!imageSrc || !canvas) return;

//     fabric.Image.fromURL(imageSrc, (img) => {
//       const canvasWidth = 400;
//       const canvasHeight = 240;

//       const imgWidth = img.width;
//       const imgHeight = img.height;

//       const scaleFactor = Math.min(
//         canvasWidth / imgWidth,
//         canvasHeight / imgHeight
//       );

//       img.set({
//         scaleX: scaleFactor,
//         scaleY: scaleFactor,
//         left: (canvasWidth - imgWidth * scaleFactor) / 2, 
//         top: (canvasHeight - imgHeight * scaleFactor) / 2,
//         selectable: false, // Prevent moving the background
//       });

//       canvas.clear();
//       canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));

//       // ---- ADD SELECTION BOX AUTOMATICALLY ----
//       const rectWidth = 398;
//       const rectHeight = 236;

//       const rect = new fabric.Rect({
//         left: 1,
//         top: 1,
//         width: rectWidth,
//         height: rectHeight,
//         fill: "#00000033",
//         stroke: "#EF5B30",
//         strokeWidth: 2,
//         selectable: true,
//         hasControls: true,
//         hashBorders: true,
//         cornerStrokeColor: '#EF5B30',
//         cornerColor: '#EF5B30',
//         cornerStyle: 'circle', 
//         transparentCorners: false,
//       });

//       rect.on("selected", () => {
//         setSelectedRect(rect);
//       });

//       canvas.add(rect);
//       canvas.setActiveObject(rect);
//       setSelectedRect(rect);
//       canvas.renderAll();
//     });
//   }, [imageSrc, canvas]); // Runs when imageSrc changes

//   const cropSelection = () => {
//     if (!canvas || !selectedRect || !canvas.backgroundImage) return;

//     const bgImage = canvas.backgroundImage;
//     const scaleX = bgImage.scaleX || 1;
//     const scaleY = bgImage.scaleY || 1;

//     const boundingRect = selectedRect.getBoundingRect();
//     const croppedLeft = boundingRect.left / scaleX;
//     const croppedTop = boundingRect.top / scaleY;
//     const croppedWidth = boundingRect.width / scaleX;
//     const croppedHeight = boundingRect.height / scaleY;

//     const croppedCanvas = document.createElement("canvas");
//     croppedCanvas.width = croppedWidth;
//     croppedCanvas.height = croppedHeight;
//     const ctx = croppedCanvas.getContext("2d");

//     const imgElement = new Image();
//     imgElement.src = bgImage.getSrc();
//     imgElement.onload = () => {
//       ctx.drawImage(
//         imgElement,
//         croppedLeft,
//         croppedTop,
//         croppedWidth,
//         croppedHeight,
//         0,
//         0,
//         croppedWidth,
//         croppedHeight
//       );

//       const croppedDataURL = croppedCanvas.toDataURL("image/png");    
//       setCropImages(croppedDataURL); // Store in Context instead of displaying
//       handleCropContinue();
//     };
//   };

//   return (
//     <>
//       <p>Now, crop your image</p>
//       <div className="uploaded-image-container mb-3 text-center">
//         <canvas ref={canvasRef} style={{ border: "1px dotted black" }}></canvas>
//       </div>
//       <button className="btn continue mb-3" onClick={cropSelection}>
//         Crop and Continue
//       </button>
//       <button className="btn back mb-3" onClick={handleBack}>Back</button>
//     </>
//   );
// };

// export default Cropimage;
