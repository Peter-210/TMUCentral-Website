import React, { useRef, useState, useEffect } from 'react';
import { Container, Navbar, Nav, Form, FormControl, Button, Dropdown, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

// Function for the Navbar Usage
const NavBar = ({ onFormSubmit }) => {
  // Get the references for the data
  const titleRef = useRef();
  const [priceDropdown, setPriceDropdown] = useState(false);
  const [LocationDropdowns, setLocationDropdowns] = useState(false);
  const categoryRef = useRef();
  const [category, setCategory] = useState('');
  const togglePriceDropdown = () => setPriceDropdown(!priceDropdown);
  const toggleLocationDropdowns = () => setLocationDropdowns(!LocationDropdowns);
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [fromPrice, setFromPrice] = useState('');
  const [toPrice, setToPrice] = useState('');

  async function handleSubmit(e) {

    e.preventDefault()
    console.log("Test button");
    let locationF = "null";
    if (location) {
      // Make sure the location is formatting correctly no matter what the user enters 
      let lowercaseLocation = location.toLowerCase();
      let FirstUppercaseLocation = lowercaseLocation.substring(0, 1).toUpperCase();
      lowercaseLocation = lowercaseLocation.substring(1);
      locationF = FirstUppercaseLocation + lowercaseLocation;
    }
    // When a user searches in the search bar
    const titleF = title ? title : "null";
    navigate(`/searchresults/${titleF}`);
  }

  const navbarStyle = {
    backgroundColor: '#004c9b',
    paddingInline: '2rem' 
  };

  const handleCategorySelect = (cat) => {
    setCategory(cat);
  };

  async function handleLogout() {
    setError("")
    // logout when the logout button is pressed and then go to the login page next
    try {
      await logout()
      navigate("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  // display the NAvbar with all its buttons and features
  return (
    <Navbar style={navbarStyle} variant="dark" expand="lg" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand href="/" style={{ color: '#fff' }}>TMUCENTRAL</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form onSubmit={handleSubmit} className="d-flex flex-grow-1 justify-content-center">
            <FormControl
              type="search"
              placeholder="What are you looking for?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="me-2"
              aria-label="Search"
              style={{ maxWidth: '70%' }}
            />

            <Button variant="success" className="ms-2" type="submit" style={{ marginRight: '10px' }}>Search</Button>
            {/*
            <Dropdown>
              <Dropdown.Toggle variant="outline-light" id="dropdown-basic" title={category ? category.replace(/([A-Z])/g, ' $1').trim() : "Select a category"} ref={categoryRef}>
              {category ? category.replace(/([A-Z])/g, ' $1').trim() : "Category"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleCategorySelect('Academic Services')}>Academic Services</Dropdown.Item>
                <Dropdown.Item onClick={() => handleCategorySelect('Items for Sale')}>Items for Sale</Dropdown.Item>
                <Dropdown.Item onClick={() => handleCategorySelect('Items Wanted')}>Items Wanted</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            */}
            {/* <Button variant="outline-light" className="ms-2" onClick={toggleLocationDropdowns} style={{ marginRight: '15px' }}>
              Location
            </Button> */}

            <Link to="/chat" className="btn btn-danger ms-2" style={{ marginRight: '10px' }}> Inbox </Link>
          </Form>

          {/*
            

<Button variant="outline-light" className="ms-2" onClick={togglePriceDropdown} >
              Price
            </Button>



          {priceDropdown && (
            <div className="position-relative bg-white p-3" style={{ zIndex: 1000, marginRight: '25px' }}>
              <h6>Price</h6>
              <InputGroup>
                <FormControl placeholder="from" value={fromPrice} onChange={(e) => setFromPrice(e.target.value)} />
                <FormControl placeholder="to" value={toPrice} onChange={(e) => setToPrice(e.target.value)} />
              </InputGroup>
              <Button variant="outline-secondary" className="w-100 mt-2" onClick={togglePriceDropdown}>
                Apply
              </Button>
            </div>
          )}
          */}

          {LocationDropdowns && (
            <div className="position-relative bg-white p-3" style={{ zIndex: 1000 }}>
              <h6>Location</h6>
              <FormControl
                type="search"
                placeholder=""
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="me-2"
                aria-label="Search"
                style={{ maxWidth: '100%' }}
              />
              <Button variant="outline-secondary" className="w-100 mt-2" onClick={toggleLocationDropdowns}>
                Apply
              </Button>
            </div>
          )}

          <Nav className="ms-auto">
            {/* <Nav.Link href="/myads" style={{ color: '#fff', marginRight: '5px' }}>{currentUser.email}</Nav.Link> */}
            <Nav.Link href="/myads" style={{ color: '#fff', marginRight: '5px' }}>{currentUser.email.split('@torontomu.ca')[0]}</Nav.Link>
            <Button variant="danger" onClick={handleLogout}> Log Out</Button>
            <Link to="/postad" className="ms-2">
              <Button variant="warning" style={{ color: 'white' }}>Post ad</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
