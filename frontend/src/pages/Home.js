import React, { useEffect, useState } from "react";
import { fetchFeaturedListings } from "../api";
import ListingCard from "../components/ListingCard";

function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchFeaturedListings().then(setListings);
  }, []);

  return (
    <div>
      <h1>Bất Động Sản Nổi Bật</h1>
      {listings.map((listing) => (
        <ListingCard key={listing._id} listing={listing} />
      ))}
    </div>
  );
}

export default Home;
