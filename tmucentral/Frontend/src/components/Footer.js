import React, { useRef, useState } from 'react';
import { Container, Navbar, Nav, Form, FormControl, Button, Dropdown, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// To add a footer if needed
const Footer = ({ onFormSubmit }) => {
  const titleRef = useRef();
  const [priceDropdown, setPriceDropdown] = useState(false);

  const togglePriceDropdown = () => setPriceDropdown(!priceDropdown);

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const data = { title: titleRef.current.value };
      const msg = "Results found!";
      await onFormSubmit('/searchAd', data, msg);
    } catch {
      alert("No Results");
    }
  }
  // styling the footer
  const navbarStyle = {
    backgroundColor: '#004c9b',
  };

  // display the footer if required
  return (
    <Navbar style={navbarStyle} variant="dark" expand="lg" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand href="#" style={{ color: '#fff' }}>TMUCENTRAL</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto">
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Footer;
