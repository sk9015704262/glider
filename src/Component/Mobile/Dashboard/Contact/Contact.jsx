import React from "react";
import "./Contact.css";


function Contact() {
  return (
    <>
      <section className="contact mt-5">
        <div className="container">
          <div className="row">
            <h2 className="text-center">Can’t find what you’re looking for?<br/> Let Us Help!</h2>
            <p className="text-center">
              Whether it’s custom inquiries or product questions, send us a
              message, and we’ll get back to you soon!
            </p>
            <form>
              <div className="d-grid gap-2">
                <label>Name</label>
                <input type="text" name="name" id="name" />
              </div>
              <div className="d-grid gap-2 mt-3">
                <label>Email Address</label>
                <input type="text" name="email" id="email" />
              </div>
              <div className="d-grid gap-2 mt-3">
                <label>Your Message</label>
                <textarea rows={10} />
              </div>
              <button className="btn contactbtn mt-3">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
