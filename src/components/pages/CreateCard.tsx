import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../services/api";
import "../../styles/forms.css";

export const CreateCard: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    image: "",
    address: "",
    bizNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      console.log("=== CREATE CARD START ===");
      console.log("Form data:", formData);

      const result = await apiService.createCard({
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        phone: formData.phone,
        email: formData.email,
        web: formData.web,
        image: formData.image,
        address: formData.address,
        bizNumber: formData.bizNumber,
      });

      console.log("Card created successfully:", result);
      setSuccessMessage("Card created successfully! Redirecting...");

      setTimeout(() => {
        navigate("/my-cards");
      }, 2000);
    } catch (err: any) {
      console.error("=== CREATE CARD ERROR ===");
      console.error("Full error:", err);
      console.error("Response status:", err.response?.status);
      console.error("Response data:", err.response?.data);
      console.error("Error message:", err.message);

      const errorMessage =
        err.response?.data?.message || err.message || "Error creating card";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h1>➕ Create Business Card</h1>

        {error && <div className="error-message">{error}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Your business name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subtitle">Subtitle *</label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              required
              placeholder="Your profession"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe your business"
              rows={5}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Your phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="web">Website *</label>
            <input
              type="url"
              id="web"
              name="web"
              value={formData.web}
              onChange={handleChange}
              required
              placeholder="https://example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL *</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address *</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Your business address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bizNumber">Business Number *</label>
            <input
              type="text"
              id="bizNumber"
              name="bizNumber"
              value={formData.bizNumber}
              onChange={handleChange}
              required
              placeholder="7-digit business number"
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? "⏳ Creating..." : "✅ Create Card"}
          </button>
        </form>
      </div>
    </div>
  );
};
