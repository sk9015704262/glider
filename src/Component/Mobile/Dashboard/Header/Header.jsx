import React, { useState } from "react";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../../../images/Logo.svg";
import { Link } from "react-router-dom";

function Header() {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  return (
    <>
      <Navbar
        expand="lg"
        className={`mobile-main-nav ${show ? "hide-container" : ""}`}
      >
        <Container>
          <Navbar.Brand>
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="logo img-fluid"
              loading="lazy"
            />
          </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="offcanvasNavbar"
            onClick={handleToggle}
            style={{ display: show ? "none" : "block" }}
          />
        </Container>
      </Navbar>
      {/* Offcanvas for mobile navigation */}
      <Offcanvas show={show} onHide={handleToggle} placement="start">
        <Offcanvas.Header>
          <CloseIcon onClick={handleToggle} />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" className="active">Dashboard</Nav.Link>            
            <Nav.Link as={Link} to="/visualiser">Design Center</Nav.Link>
            <Nav.Link as={Link}  to="#">Contact</Nav.Link>
            <Nav.Link as={Link} to="#">About</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>      
    </>
  );
}

export default Header;
