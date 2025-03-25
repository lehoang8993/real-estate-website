import { useState, useEffect } from "react";
import axios from "axios";

export default function PostListing() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    images: "",
    email: "",
  });
  const [featuredListings, setFeaturedListings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/featured-listings")
      .then((response) => setFeaturedListings(response.data))
      .catch((error) =>
        console.error("Error fetching featured listings:", error)
      );
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/post-listing",
        formData
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error posting listing:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Đăng tin bất động sản</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Tiêu đề"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Mô tả"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="number"
          name="price"
          placeholder="Giá"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="images"
          placeholder="URL hình ảnh"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Đăng tin
        </button>
      </form>
      <h2 className="text-xl font-bold mt-6">Tin nổi bật</h2>
      <ul>
        {featuredListings.map((listing, index) => (
          <li key={index} className="p-2 border-b">
            {listing.title} - {listing.price} VND
          </li>
        ))}
      </ul>
    </div>
  );
}
