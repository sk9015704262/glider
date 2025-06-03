import React from "react";
import "./HowWork.css";
// import heart from "../../../images/Heart.png";

function HowWork() {
  return (
    <>
      <section className="how-work mt-4">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center pt-5 pb-4">
              <h2>How It Works</h2>
              <p>
                Share your experience with the Gliderol
                Visualiser to make it even better
              </p>
              <div className="mb-4 text-center">
                <p className="work-count">1</p>
                <h4>Upload Your Photo</h4>
                <p>Drag and drop or select an image of your garage door</p>
              </div>
              <div className="mb-4">
                <p className="work-count">2</p>
                <h4>Choose Your Style</h4>
                <p>Pick from a range of materials, colors, and designs</p>
              </div>
              <div className="">
                <p className="work-count">3</p>
                <h4>See the Transformation</h4>
                <p> Instantly preview your garage door s new look.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HowWork;
