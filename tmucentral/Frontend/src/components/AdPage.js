import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";
import "./AdPage.css";
import { useNavigate } from "react-router-dom";

const AdPage = () => {
  const { adId } = useParams();
  const [ad, setAd] = useState(null);

  const navigate = useNavigate();

  // Fetching ad data from the server
  useEffect(() => {
    const PORT = process.env.PORT || 3005;
    const url = `https://tmucentral.onrender.com/api/database/getAdById/${adId}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setAd(data))
      .catch((err) => console.error("Failed to fetch ad:", err));
  }, [adId]);

  if (!ad) {
    return <div>Loading...</div>;
  }
  // Function to handle contact seller button click
  const handleContactSeller = () => {
    navigate("/chat", { state: { sellerEmail: ad.email } });
  };
  // Displaying ad details on the page
  return (
    <Container className="ad-page-container my-5">
      <Row className="justify-content-md-center">
        {/* Image column */}
        <Col md={6}>
          <Card>
            <Card.Img
              variant="top"
              src={ad.image}
              alt={ad.title}
            />
          </Card>
        </Col>
        {/* Details column */}
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title className="mt-3 mb-3 display-5">{ad.title}</Card.Title>
              <Card.Text>
                <strong>Location: </strong>
                <span className="text-muted">{ad.location}</span>
              </Card.Text>
              <Card.Text className="ad-description mb-3">
                <strong>Details: </strong>
                {ad.description}
              </Card.Text>
              <ListGroup variant="flush" className="ad-details-list">
                <ListGroup.Item>
                  <h4>Price: ${ad.price}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>Category: {ad.category.join(", ") || "Not specified"}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>Condition: {ad.condition || "Not specified"}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>Posted on: {new Date(ad.postDate).toLocaleDateString()}</p>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-center align-items-center">
                  <Button variant="primary" onClick={handleContactSeller}>
                    Contact Seller
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );

};

export default AdPage;
