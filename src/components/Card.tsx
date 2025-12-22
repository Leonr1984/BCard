import React from "react";
import { Link } from "react-router-dom";
import { Card as CardType } from "../types";
import { useAuth } from "../hooks/useAuth";
import "../styles/cards.css";

interface CardProps {
  card: CardType;
  onDelete?: (cardId: string) => void;
  onLike?: (cardId: string) => void;
  isLiked?: boolean;
}

export const Card: React.FC<CardProps> = ({
  card,
  onDelete,
  onLike,
  isLiked,
}) => {
  const { user } = useAuth();

  const getImageUrl = (image: any): string => {
    if (typeof image === "string") {
      return image;
    }
    if (image && typeof image === "object" && image.url) {
      return image.url;
    }
    return "https://via.placeholder.com/300x200?text=No+Image";
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

  const handleLikeClick = () => {
    if (onLike) {
      onLike(card._id);
    }
  };

  const handleDeleteClick = () => {
    if (
      onDelete &&
      window.confirm("Are you sure you want to delete this card?")
    ) {
      onDelete(card._id);
    }
  };

  const userId = card.user_id || card.userId;

  return (
    <div className="card">
      <img
        src={getImageUrl(card.image)}
        alt={card.title}
        className="card-image"
      />
      <div className="card-content">
        <h3>{card.title}</h3>
        <p className="card-subtitle">{card.subtitle}</p>
        <p className="card-description">
          {card.description.substring(0, 100)}...
        </p>
        <div className="card-info">
          <p>
            <strong>Phone:</strong> {card.phone}
          </p>
          <p>
            <strong>Email:</strong> {card.email}
          </p>
          <p>
            <strong>Web:</strong>{" "}
            <a href={card.web} target="_blank" rel="noopener noreferrer">
              {card.web}
            </a>
          </p>
          <p>
            <strong>Address:</strong> {formatAddress(card.address)}
          </p>
        </div>
      </div>
      <div className="card-actions">
        <Link to={`/card/${card._id}`} className="btn btn-primary">
          📖 View Details
        </Link>

        {onLike && (
          <button
            onClick={handleLikeClick}
            className={`btn-like ${isLiked ? "liked" : ""}`}
            title={isLiked ? "Unlike" : "Like"}
          >
            {isLiked ? "❤️" : "🤍"}
          </button>
        )}

        {user && user._id === userId && (
          <>
            <Link
              to={`/edit-card/${card._id}`}
              className="btn btn-primary"
              title="Edit"
            >
              ✏️ Edit
            </Link>
            {onDelete && (
              <button
                onClick={handleDeleteClick}
                className="btn btn-delete"
                title="Delete"
              >
                🗑️ Delete
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
