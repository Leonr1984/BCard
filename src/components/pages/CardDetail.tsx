import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "../../types";
import { apiService } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/cards.css";

export const CardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<Card | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        if (id) {
          const data = await apiService.getCardById(id);
          setCard(data);
          if (user) {
            setIsLiked(data.likes.includes(user._id));
          }
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Error loading card");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCard();
  }, [id, user]);

  const handleLike = async () => {
    if (!user || !card) return;

    try {
      if (isLiked) {
        await apiService.unlikeCard(card._id);
      } else {
        await apiService.likeCard(card._id);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Error toggling like", err);
    }
  };

  const getImageUrl = (image: any): string => {
    if (typeof image === "string") {
      return image;
    }
    if (image && typeof image === "object" && image.url) {
      return image.url;
    }
    return "https://via.placeholder.com/400x300?text=No+Image";
  };

  const formatAddress = (address: any): string => {
    if (typeof address === "string") {
      return address;
    }
    if (address && typeof address === "object") {
      const { street, houseNumber, city, state, zip } = address;
      return `${street || ""} ${houseNumber || ""}, ${city || ""} ${
        state || ""
      } ${zip || ""}`.trim();
    }
    return "No address provided";
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!card) return <div className="error">Card not found</div>;

  const userId = card.user_id || card.userId;

  return (
    <div className="card-detail-page">
      <div className="card-detail-container">
        <img
          src={getImageUrl(card.image)}
          alt={card.title}
          className="detail-image"
        />

        <div className="card-detail-content">
          <h1>{card.title}</h1>
          <p className="subtitle">{card.subtitle}</p>

          <div className="detail-actions">
            {user && userId === user._id && (
              <Link to={`/edit-card/${card._id}`} className="btn btn-primary">
                ✏️ Edit Card
              </Link>
            )}
            {user && (
              <button
                onClick={handleLike}
                className={`btn btn-like ${isLiked ? "liked" : ""}`}
              >
                {isLiked ? " ❤️ Unlike" : " 🤍 Like"}
              </button>
            )}
          </div>

          <section className="detail-section">
            <h2>Description</h2>
            <p>{card.description}</p>
          </section>

          <section className="detail-section">
            <h2>Contact Information</h2>
            <p>
              <strong>Phone:</strong>{" "}
              <a href={`tel:${card.phone}`}>{card.phone}</a>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${card.email}`}>{card.email}</a>
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a href={card.web} target="_blank" rel="noopener noreferrer">
                {card.web}
              </a>
            </p>
          </section>

          <section className="detail-section">
            <h2>Location</h2>
            <p>{formatAddress(card.address)}</p>
            <iframe
              width="100%"
              height="400"
              style={{ border: 0 }}
              title="Business location"
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
                formatAddress(card.address)
              )}`}
            />
          </section>

          <section className="detail-section">
            <h2>Business Number</h2>
            <p>{card.bizNumber}</p>
          </section>
        </div>
      </div>
    </div>
  );
};
