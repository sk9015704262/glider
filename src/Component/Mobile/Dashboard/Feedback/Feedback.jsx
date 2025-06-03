import { Rating } from "@mui/material";
import React, { useState } from "react";
import "./Feedback.css";


function Feedback() {
    const [value, setValue] = useState(2);
  return (
    <>
      <section className="feedback mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>We Value Your Feedback</h2>
              <p>
                Help us improve! Share your experience with the Gliderol
                Visualiser to make it even better
              </p>
              <div className="rating">
                <p className="mb-0">Rating</p>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue)
                  }}
                    className="d-flex justify-content-between w-100"
                    sx={{fontSize: "2rem"}}
                    
                />
              </div>
              <p className="mt-4">
              Tell us what you think!
              </p>
              <textarea rows={10} className="w-100"/>
              <button className="btn feedbtn mt-3">Leave Feedback</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Feedback;
