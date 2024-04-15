import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, ListGroup, Card } from "react-bootstrap";
import AdCard from "./AdCard";
import NavBar from "./NavBar";
import { Link, useNavigate } from "react-router-dom";
export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [activeMenu, setActiveMenu] = useState("");
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetching the ads from the database
    const PORT = process.env.PORT || 3005;
    const url = `https://tmucentral.onrender.com/api/database/getAds`;
    fetch(url)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response was not okay");
        }
        return resp.json();
      })
      .then((ads) => setAds(ads.Ads))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    // Fetching the users from the database
    const PORT = process.env.PORT || 3005;
    const url = `https://tmucentral.onrender.com/api/database/getUsers`;

    if (activeMenu === "manage-users") {
      fetch(url)
        .then((resp) => {
          if (!resp.ok) {
            throw new Error("Network response was not okay");
          }
          return resp.json();
        })
        .then((data) => setUsers(data.Review))
        .catch((err) => console.error(err));
    }
  }, [activeMenu]);

  const handleMenuSelect = (menuKey) => {
    setActiveMenu(menuKey);
  };

  async function handleDelete(type, itemId) {
    // Find the specific ad in the database
    const PORT = process.env.PORT || 3005;
    const url = `https://tmucentral.onrender.com/api/database/${type}/${itemId}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Network response was not okay");
      }
      // send a delete query to the database
      const responseData = await response.json();
      console.log("Data Submitted: ", responseData);
      setAds((currentAds) => currentAds.filter((ad) => ad._id !== itemId));
      setUsers((currentUsers) =>
        currentUsers.filter((user) => user._id !== itemId)
      );
    } catch (err) {
      console.error("Error deleting the item: ", err);
    }
  }
  // Displaying the menu on the page
  return (
    <div>
      <NavBar></NavBar>
      <br></br>
      <Container fluid>
        <Row>
          <Col md={3} className="mb-3">
            <h3>Admin Menu</h3>
            <ListGroup>
              <ListGroup.Item
                action
                href="#manage-ads"
                onClick={() => handleMenuSelect("manage-ads")}
              >
                Manage Ads
              </ListGroup.Item>
              <ListGroup.Item
                action
                href="#manage-users"
                onClick={() => handleMenuSelect("manage-users")}
              >
                Manage Users
              </ListGroup.Item>
              <ListGroup.Item
                action
                href="#site-content"
                onClick={() => navigate("/")}
              >
                Site Content
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={9}>
            {activeMenu === "manage-ads" && (
              <Card>
                <Card.Body>
                  <Card.Title>Manage Ads</Card.Title>
                  <ListGroup>
                    {ads.map((ad, index) => (
                      <div>
                        <AdCard
                          price={ad.price}
                          title={ad.title}
                          description={ad.description}
                          image={ad.image}
                          postDate={ad.postDate}
                          location={ad.location}
                        />
                        <Button
                          variant="danger"
                          onClick={() => handleDelete("deleteAd", ad._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            )}

            {activeMenu === "manage-users" && (
              <Card>
                <Card.Body>
                  <Card.Title>Manage Users</Card.Title>
                  <ListGroup>
                    {users.map((user, index) => (
                      <ListGroup.Item key={index}>
                        <strong>Name:</strong> {user.name} <br />
                        <strong>Email:</strong> {user.email} <br />
                        <strong>Id:</strong> {user._id} <br />
                        <Button
                          variant="danger"
                          onClick={() => handleDelete("deleteUser", user._id)}
                        >
                          Delete
                        </Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
