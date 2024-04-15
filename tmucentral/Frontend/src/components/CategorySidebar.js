import React from "react";
import { ListGroup } from "react-bootstrap";
import PriceRangeFilter from "./PriceRangeFilter";
import { useRef, useState, useEffect } from 'react';
import { Container, Navbar, Nav, Form, FormControl, Button, Dropdown, InputGroup, Col } from 'react-bootstrap';

// Defining the attributes for the category sidebar and its properties
const CategorySidebar = ({ categories, onSelectCategory, onSelectPriceRange, onSelectLocation }) => {
    const [location, setLocation] = useState('');
    const headerStyle = {
        color: '#333',
        marginBottom: '20px',
    };

    const subHeaderStyle = {
        marginTop: '40px',
        color: '#555',
    };

    const handleLocationSubmit = (e) => {
        e.preventDefault();
        onSelectLocation(location);
    }

    // Displaying the category on the page
    return (
        
        <>
            <ListGroup>
                <h5 style={headerStyle}>Filter By Category</h5>
                {categories.map((category) => (
                    <ListGroup.Item
                        key={category.name} // Use category.name instead of category for the key
                        action
                        onClick={() => onSelectCategory(category.name)} // Pass category.name if you only need the name
                    >
                        {category.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <h5 style={subHeaderStyle}>Price Range</h5>
            <PriceRangeFilter onSelectPriceRange={onSelectPriceRange} />
            <h5 style={subHeaderStyle}>Location</h5>
            <Form>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row'}}>   
            <FormControl
              type="search"
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="me-2"
              aria-label="Search"
              style={{ maxWidth: '70%' }}
            />
            <Button variant="primary" className="ms-1" onClick = {handleLocationSubmit} style={{ marginRight: '10px' }}>Submit</Button>
             </div>
            </Form>
        </>
    );
}

export default CategorySidebar;
