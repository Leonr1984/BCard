import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../Card";
import { useAuth } from "../../hooks/useAuth";
import { useCards } from "../../hooks/useCards";
import "../../styles/cards.css";

export const MyCards: React.FC = () => {
  const { user } = useAuth();
  const { cards, deleteCard, likeCard, unlikeCard } = useCards();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [cards]);

  if (isLoading) return <div className="loading">Loading...</div>;

  const myCards = cards.filter((card) => {
    const userId = card.user_id || card.userId;
    return userId === user?._id;
  });

  const handleLike = (cardId: string) => {
    const card = cards.find((c) => c._id === cardId);
    if (card && user) {
      if (card.likes.includes(user._id)) {
        unlikeCard(cardId);
      } else {
        likeCard(cardId);
      }
    }
  };

  const handleDelete = (cardId: string) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      deleteCard(cardId);
    }
  };

  return (
    <div className="page">
      <h1>My Business Cards</h1>
      <button
        onClick={() => navigate("/create-card")}
        className="btn btn-primary"
      >
        ➕ Create New Card
      </button>

      {myCards.length === 0 ? (
        <div className="empty-state">
          <p>You haven't created any cards yet</p>
          <button
            onClick={() => navigate("/create-card")}
            className="btn btn-primary"
          >
            Create Your First Card
          </button>
        </div>
      ) : (
        <div className="cards-grid">
          {myCards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onDelete={handleDelete}
              onLike={handleLike}
              isLiked={user ? card.likes.includes(user._id) : false}
            />
          ))}
        </div>
      )}
    </div>
  );
};
