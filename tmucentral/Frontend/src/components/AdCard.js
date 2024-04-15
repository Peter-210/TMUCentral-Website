import React from "react";
import { Card } from "react-bootstrap";
import defaultImage from "../default.jpg";
// To display the actual individual ad
function AdCard({ price, title, description, image, postDate, location }) {
  //converting price into the right format
  price = `\$${price}.00`;
  // getting the date to use in the ad
  const date = postDate.substring(0, 10);
  const time = postDate.substring(11, 20);
  postDate = date;

  // Displaying the individual ad details on the page
  return (
    <div style={{ paddingTop: "2rem" }}>
      <Card className="text-center">
        <Card.Img
          variant="top"
          src={image || defaultImage}
          style={{
            maxWidth: "300px",
            maxHeight: "200px",
            objectFit: "cover",
            marginTop: "10px",
            margin: "0 auto",
          }}
        />
        <Card.Body>
          <Card.Title style={{ marginBottom: "30px" }}>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Price: {price}
          </Card.Subtitle>
          <Card.Text>Post Date: {postDate}</Card.Text>
          <Card.Text>Location: {location}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AdCard;
