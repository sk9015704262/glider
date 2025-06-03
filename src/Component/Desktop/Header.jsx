import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../images/Logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import "./Desktop.css";
import Gallery from "../Mobile/Visualiser/Gallery/Gallery";

function Header() {
  const [search, setSearch] = useState(false);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);
  

  const handleShow = () => {
    if (search === true) {
      setSearch(false);
    } else {
      setSearch(true);
    }
  };

  const openModal = () => {
    setOpen(true);
  };


  return (
    <>
      {/* <Navbar expand="lg" className="desktop-main-nav">
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
          <Nav>
            <Nav.Link as={Link} to="/">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              How to Buy
            </Nav.Link>
            <Nav.Link as={Link} to="#">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="#">
              Contact
            </Nav.Link>
            <button className="btn dealer me-3 ms-2 d-flex align-items-center">
              <PersonSearchIcon className="me-2" />
              Find a Dealer
            </button>           
            <button className="btn quote me-3">Request a Quote</button>
            <SearchIcon sx={{ color: "#103469" }} onClick={handleShow} />
            {search && (
              <input
                type="text"
                placeholder="Search..."
                id="search"
                className="search-input"
              />
            )}
          </Nav>
        </Container>
      </Navbar> */}
    
    </>
  );
}

export default Header;
