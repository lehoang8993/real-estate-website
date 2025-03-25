import React, { useState } from "react";
import { postListing } from "../api";

function ListingForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    images: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await postListing(formData);
    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Tiêu đề"
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Mô tả"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Giá"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="images"
        placeholder="URL Hình ảnh"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <button type="submit">Đăng Tin</button>
    </form>
  );
}

export default ListingForm;
