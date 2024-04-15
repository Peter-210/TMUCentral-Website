import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdCard from "./AdCard";
import CategorySidebar from "./CategorySidebar";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./AdDisplayCard.css";
import NavBar from "./NavBar";

const SearchResult = ({ onFormSubmit }) => {
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  let { title } = useParams();
  const [selectedLocation, setSelectedLocation] = useState("");
  const categories = [
    { name: "All" },
    { name: "Academic Services" },
    { name: "Items for Sale" },
    { name: "Items Wanted" },
  ];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const PORT = process.env.PORT || 3005;
      const url = `https://tmucentral.onrender.com/api/database/searchAds`;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
          }),
        });

        if (!response.ok) {
          // throw new Error("Network response was not okay");
        }
        const data = await response.json();
        if (data && data.Ad) {
          setAds(data.Ad);
        } else {
          console.error("No ads found");
          setAds([]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [title]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const onSelectPriceRange = (priceRange) => {
    setSelectedPriceRange(priceRange);
  };

  const onSelectLocation = (selectedLocation) => {
    setSelectedLocation(selectedLocation);
  };

  // Helper function to parse price range and filter ads
  const filterAdsByPrice = (ads, priceRange) => {
    if (!priceRange) return ads; // No filter applied
    // print all category inside ads
    console.log(ads);

    const [minPrice, maxPrice] = priceRange.split("-").map(Number);
    return ads.filter((ad) => {
      const price = Number(ad.price); // Ensure the price is a number
      // Filter logic
      return price >= minPrice && (maxPrice ? price <= maxPrice : true);
    });
  };
  // Helper function to filter by selected category
  const filterAdsByCategory = (ads, selectedCategoryName) => {
    if (!selectedCategoryName || selectedCategoryName === "All") return ads;
    return ads.filter((ad) => {
      return ad.category.includes(selectedCategoryName);
    });
  };

  // Helper function to filter by entered location
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

  const filteredAds = filterAdsByLocation(
    filterAdsByCategory(
      filterAdsByPrice(ads, selectedPriceRange),
      selectedCategory
    ),
    selectedLocation
  );

  if (!ads) {
    return <div>Loading...</div>;
  }

  // Display the Search result posts
  return (
    <div>
      <NavBar></NavBar> <br></br>
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
    </div>
  );
};

export default SearchResult;