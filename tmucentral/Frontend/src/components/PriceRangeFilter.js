import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

// define price ranges
const priceRanges = [
    { label: "Under 50", value: "0-50" },
    { label: "50-100", value: "50-100" },
    { label: "100-200", value: "100-200" },
    { label: "200-500", value: "200-500" },
    { label: "500-1000", value: "500-1000" },
    { label: "Over 1000", value: "1000-10000" }
];

// Function to select posts based on the price range
const PriceRangeFilter = ({ onSelectPriceRange }) => {
    const [customMin, setCustomMin] = useState('');
    const [customMax, setCustomMax] = useState('');

    // When the user inputs a custom price range
    const handleCustomPriceSubmit = (e) => {
        e.preventDefault();
        onSelectPriceRange(`${customMin}-${customMax}`);
        setCustomMax('');
        setCustomMin('');
    }
    // Display the Price range and custom price(in the category sidebar)
    return (
        <Form>
            {priceRanges.map((range) => (
                <Form.Check
                    key={range.value}
                    type="radio"
                    label={range.label}
                    name="priceRange"
                    value={range.value}
                    onChange={(e) => onSelectPriceRange(e.target.value)}
                />
            ))}
            <div className="custom-price-range mt-3">   
                <Form.Label style={{}}>Custom Price Range</Form.Label>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: "5px"}}>
                <Col xs={4} md={4}>
                    <Form.Control
                        type="numeric"
                        placeholder="Min"
                        value={customMin}
                        onChange={(e) => setCustomMin(e.target.value)}
                        style={{ fontSize: "0.8em"}}
                    />
                </Col>
                <Col xs={4} md={4}>
                    <Form.Control
                        type="numeric"
                        placeholder="Max"
                        value={customMax}
                        onChange={(e) => setCustomMax(e.target.value)}
                        style={{ fontSize: "0.8em"}}
                    />
                </Col>
                <Button
                    variant="primary"
                    type="submit"
                    onClick={handleCustomPriceSubmit}
                    style={{ fontSize: "0.8em"}}
                >
                    Submit
                </Button>
                </div>
            </div>
        </Form>
    )
}

export default PriceRangeFilter;
