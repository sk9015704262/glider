import React from "react";
import "./footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";
import logo from "../../../images/White-Logo.svg"

function Footer() {
  return (
    <footer className="footer mt-5 pt-5">
      <div className="container">
        <div className="row">
          {/* Head Office Section */}
          <img src={logo} alt="Logo" className="footer-logo img-fluid mb-4" loading="lazy"/>
          <div className="col-12 col-md-4 mb-4">
            <p className="mb-0 fw-bold text-uppercase head">Head Office</p>
            <p>
              32 Jacobsen Crescent <br />
              Holden Hill <br />
              South Australia 5088 <br />
              ACN 007 928 949 <br />
              ABN 92 007 928 949
            </p>
          </div>

          {/* Contact Section */}
          <div className="col-12 col-md-4 mb-4">
            <p className="mb-0 fw-bold text-uppercase head">Contact</p>
            <p>
              <Link href="tel:1300799177" className="text-decoration-none">
                1300 799 177
              </Link>
              <br />
              <Link href="mailto:info@gliderol.com.au" className="text-decoration-none">
                info@gliderol.com.au
              </Link>
            </p>

            {/* Social Media Icons (Centered on Mobile) */}
            <div className="d-flex gap-3 mb-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FacebookIcon />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <XIcon />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <LinkedInIcon />
              </Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <YouTubeIcon />
              </Link>
            </div>
          </div>

          {/* Links Section */}
          <div className="col-12 col-md-4 mb-4">
            <p className="fw-bold text-uppercase head">About Gliderol</p>
            <ul className="list-unstyled">
              <li><Link href="#" className="text-decoration-none">Why Choose Gliderol?</Link></li>
              <li><Link href="#" className="text-decoration-none">Contact Us</Link></li>
            </ul>

            <p className="fw-bold text-uppercase mt-4 head">Customer Service</p>
            <ul className="list-unstyled">
              <li><Link href="#" className="text-decoration-none">Request a Quote</Link></li>
              <li><Link href="#" className="text-decoration-none">Find a Dealer</Link></li>
              <li><Link href="#" className="text-decoration-none">Support & Resources</Link></li>
            </ul>

            <p className="fw-bold text-uppercase mt-4 head">Legal</p>
            <ul className="list-unstyled">
              <li><Link href="#" className="text-decoration-none">Privacy Policy</Link></li>
              <li><Link href="#" className="text-decoration-none">Terms & Conditions</Link></li>
              <li><Link href="#" className="text-decoration-none">Cookie Policy</Link></li>
              <li><Link href="#" className="text-decoration-none">Warranty Terms</Link></li>
            </ul>
          </div>
        </div>
        {/* Footer Bottom */}
        <hr className="mt-3 footer-hr" />
        <p>© 2024 Gliderol. All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;