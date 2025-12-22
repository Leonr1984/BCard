import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "../../types";
import { apiService } from "../../services/api";
import "../../styles/forms.css";

export const EditCard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        if (id) {
          const data = await apiService.getCardById(id);
          setCard(data);
        }
      } catch (err: any) {
        setError("Error loading card");
      } finally {
        setLoading(false);
      }
    };
    fetchCard();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (card) {
      setCard({ ...card, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!card) return;

    setIsSubmitting(true);
    try {
      const addressValue =
        typeof card.address === "string"
          ? card.address
          : JSON.stringify(card.address);

      await apiService.updateCard(card._id, {
        title: card.title,
        subtitle: card.subtitle,
        description: card.description,
        phone: card.phone,
        email: card.email,
        web: card.web,
        image:
          typeof card.image === "string" ? card.image : card.image?.url || "",
        address: addressValue,
        bizNumber: card.bizNumber.toString(),
      });
      navigate("/my-cards");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error updating card");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!card) return <div className="error">Card not found</div>;

  return (
    <div className="form-page">
      <div className="form-container">
        <h1>Edit Business Card</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={card.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={card.subtitle}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={card.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={card.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={card.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Website</label>
            <input
              type="url"
              name="web"
              value={card.web}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="url"
              name="image"
              value={
                typeof card.image === "string"
                  ? card.image
                  : card.image?.url || ""
              }
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={
                typeof card.address === "string"
                  ? card.address
                  : JSON.stringify(card.address)
              }
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Business Number</label>
            <input
              type="text"
              name="bizNumber"
              value={card.bizNumber}
              onChange={handleChange}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
          >
            {isSubmitting ? "Updating..." : "Update Card"}
          </button>
        </form>
      </div>
    </div>
  );
};
