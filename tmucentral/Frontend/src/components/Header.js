import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

// Function to view a header on specific pages
export default function Header(props) {
  // Designing the header on new specifications
  const navbarStyle = {
    backgroundColor: '#004c9b',
    marginBottom: '5rem', 
    paddingInline: '2rem' 
  };

  // Display the header
  return (
    <>
      <Navbar style={navbarStyle} variant="dark" expand="lg" className="shadow-sm">
        <Container fluid>
          <Navbar.Brand href="/" style={{ color: '#fff' }}>TMUCENTRAL</Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid>
        {props.childComp}
      </Container>

    </>
  );
};

