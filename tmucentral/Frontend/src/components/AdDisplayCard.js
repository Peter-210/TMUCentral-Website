import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdCard from "./AdCard";
import CategorySidebar from "./CategorySidebar";
import { Link } from "react-router-dom";
import "./AdDisplayCard.css";

const AdDisplayCard = ({ onFormSubmit }) => {
  const [ads, setAds] = useState([]);
  const categories = [
    { name: "All" },
    { name: "Academic Services" },
    { name: "Items for Sale" },
    { name: "Items Wanted" },
  ];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

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
  // Function to handle category selection
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };
 // Function to handle price range selection
  const onSelectPriceRange = (priceRange) => {
    setSelectedPriceRange(priceRange);
  };
  // Function to handle location selection
  const onSelectLocation = (selectedLocation) => {
    setSelectedLocation(selectedLocation);
  };

  // Helper function to parse price range and filter ads
  const filterAdsByPrice = (ads, priceRange) => {
    if (!priceRange) return ads; // No filter applied

    const [minPrice, maxPrice] = priceRange.split("-").map(Number);
    return ads.filter((ad) => {
      const price = Number(ad.price); // Ensure the price is a number
      // Filter logic
      return price >= minPrice && (maxPrice ? price <= maxPrice : true);
    });
  };
  // Helper function to filter ads by category
  const filterAdsByCategory = (ads, selectedCategoryName) => {
    if (!selectedCategoryName || selectedCategoryName === "All") return ads;
    return ads.filter((ad) => {
      return ad.category.includes(selectedCategoryName);
    });
  };
  // Helper function to filter ads by location
  const filterAdsByLocation = (ads, selectedLocation) => {
    if (!selectedLocation) return ads;
    else {
      let lowercaseLocation = selectedLocation.toLowerCase();
      let FirstUppercaseLocation = lowercaseLocation
        .substring(0, 1)
        .toUpperCase();
      lowercaseLocation = lowercaseLocation.substring(1);
      selectedLocation = FirstUppercaseLocation + lowercaseLocation;
    }
    return ads.filter((ad) => {
      return ad.location.includes(selectedLocation);
    });
  };
 // Filtering ads based on selected category, price range, and location
  const filteredAds = filterAdsByLocation(
    filterAdsByCategory(
      filterAdsByPrice(ads, selectedPriceRange),
      selectedCategory
    ),
    selectedLocation
  );
  // Displaying ads on the page if they are loaded
  if (!ads) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="ad-grid-container">
      <Row>
        <Col md={3}>
          <CategorySidebar
            categories={categories}
            onSelectCategory={handleSelectCategory}
            onSelectPriceRange={onSelectPriceRange}
            onSelectLocation={onSelectLocation}
          />
        </Col>
        <Col md={9}>
          <Row>
            {console.log}
            {filteredAds.map((ad) => (
              <Col sm={6} lg={4} xl={3} key={ad._id}>
                <Link to={`/ad/${ad._id}`} style={{ textDecoration: "none" }}>
                  <AdCard
                    price={ad.price}
                    title={ad.title}
                    description={ad.description}
                    image={ad.image}
                    postDate={ad.postDate}
                    location={ad.location}
                  />
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AdDisplayCard;
