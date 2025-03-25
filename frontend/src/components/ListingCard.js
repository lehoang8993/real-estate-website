import React from "react";

function ListingCard({ listing }) {
  return (
    <div>
      <h2>{listing.title}</h2>
      <p>{listing.description}</p>
      <p>Giá: {listing.price} VND</p>
      {listing.images && (
        <img
          src={listing.images}
          alt={listing.title}
          style={{ width: "200px" }}
        />
      )}
    </div>
  );
}

export default ListingCard;
