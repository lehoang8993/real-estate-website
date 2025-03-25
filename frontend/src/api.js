export const API_URL = "https://real-estate-backend-gcol.onrender.com";

export async function fetchFeaturedListings() {
  const response = await fetch(`${API_URL}/featured-listings`);
  return response.json();
}

export async function postListing(formData) {
  const response = await fetch(`${API_URL}/post-listing`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return response.json();
}
