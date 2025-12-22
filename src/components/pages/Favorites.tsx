import React from "react";
import { Card } from "../Card";
import { useAuth } from "../../hooks/useAuth";
import { useCards } from "../../hooks/useCards";
import "../../styles/cards.css";

export const Favorites: React.FC = () => {
  const { user } = useAuth();
  const { cards, deleteCard, likeCard, unlikeCard } = useCards();

  const favoriteCards = cards.filter(
    (card) => user && card.likes.includes(user._id)
  );

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
      <h1> ❤️ Favorite Cards</h1>
      {favoriteCards.length === 0 ? (
        <div className="empty-state">
          <p>You haven't marked any cards as favorite</p>
          <p>Click the heart icon on any card to add it to favorites</p>
        </div>
      ) : (
        <div className="cards-grid">
          {favoriteCards.map((card) => (
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
