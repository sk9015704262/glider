import React from "react";
import "./Banner.css";
import banner from "../../../images/07-4.png";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import HowWork from "../HowWork/HowWork";
import Feedback from "../Feedback/Feedback";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";

function Banner() {
  return (
    <>
      <Header />
      <section className="banner mt-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Reimagine your garage door in secounds</h1>
              <p>
                Upload a photo of your own home or choose one from the gallery
                to begin customising your own garage door. With a large range of
                styles and colours, Gliderol offers something that will suit
                every home. Once you have designed your dream garage door, you
                can either save your design or send to your nearest Dealer for a
                FREE Measure and Quote.
              </p>
              <img
                src={banner}
                alt="banner"
                className="img-fluid mb-4 banner-img"
                loading="lazy"
              />
              <Link to="/visualiser">
                <button className="btn tryvisul">Try the Design Center</button>
              </Link>
              <button className="btn contact mt-3">Contact Us</button>
            </div>
          </div>
        </div>
      </section>
      <HowWork />
      <Feedback />
      <Contact />
      <Footer />
    </>
  );
}

export default Banner;
