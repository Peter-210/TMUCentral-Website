import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import AdCard from './AdCard';
import './AdDisplayCard.css';
import { useAuth } from "../contexts/AuthContext"
import NavBar from './NavBar';
import { Link, useLocation, useNavigate, createSearchParams } from 'react-router-dom';

// Function to display the My Ads page
const MyAdDisplayCard = () => {
    // get the current user's email as well as the ad
    const [ads, setAds] = useState([]);
    const { currentUser, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            // search and get the ad from the backend server
            const PORT = process.env.PORT || 3005;
            const url = `https://tmucentral.onrender.com/api/database/searchAd`;
            const userEmail = currentUser.email
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: userEmail }),
                });

                if (!response.ok) {
                    throw new Error("Network response was not okay");
                }

                const data = await response.json();
                // set the add data to the new modified data
                if (data && data.Ad) {
                    setAds(data.Ad);
                } else {
                    console.error("No ads found");
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [location.state]);

    // Function to delete the Ad
    async function handleDelete(itemId) {
        const PORT = process.env.PORT || 3005;
        const url = `https://tmucentral.onrender.com/api/database/deleteAd/${itemId}`;

        // Confirmation for deleteing the Ad
        if (!window.confirm("Are you sure you want to delete this ad?")) return;

        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) {
                throw new Error("Network response was not okay");
            }

            const responseData = await response.json();
            console.log("Data Submitted: ", responseData);
            setAds(currentAds => currentAds.filter(ad => ad._id !== itemId));

        } catch (err) {
            console.error("Error deleting the item: ", err);
        }
    };
    // Display the My Ads page with all the ads and options
    return (
        <div>
            <NavBar></NavBar> <br></br>
            <h2 style={{ marginLeft: "50px" }}>My Ads</h2>
            <Container className="ad-grid-container">
                {ads.map((ad) => (
                    <div>
                        <Link to={`/ad/${ad._id}`} style={{ textDecoration: 'none' }}>
                            <AdCard
                                price={ad.price}
                                title={ad.title}
                                description={ad.description}
                                image={ad.image}
                                postDate={ad.postDate}
                                location={ad.location}
                            />
                        </Link>
                        <Button variant="warning" onClick={() => navigate({
                            pathname: "/editad",
                            search: createSearchParams({
                                adId: ad._id
                            }).toString()
                        })}>Edit</Button>
                        <Button variant="danger" onClick={() => handleDelete(ad._id)}>Delete</Button>
                    </div>
                ))}
            </Container>
        </div>
    );
};

export default MyAdDisplayCard;
