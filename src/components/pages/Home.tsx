import React, { useState } from "react";
import { Card } from "../Card";
import { useCards } from "../../hooks/useCards";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/cards.css";

export const Home: React.FC = () => {
  const { cards, isLoading, error, likeCard, unlikeCard, deleteCard } =
    useCards();
  const { user } = useAuth();
  const [filter, setFilter] = useState("all");

  if (isLoading) return <div className="loading">Loading cards...</div>;
  if (error) return <div className="error">{error}</div>;

  const myCards = cards.filter((card) => card.userId === user?._id);
  const displayCards = filter === "my" ? myCards : cards;

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

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to BCard</h1>
          <p>Your professional business card platform</p>
          {!user && (
            <p className="hero-subtext">
              Sign in to start creating and sharing your business cards
            </p>
          )}
        </div>
      </section>

      {user && (
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All Cards ({cards.length})
          </button>
          <button
            className={`filter-btn ${filter === "my" ? "active" : ""}`}
            onClick={() => setFilter("my")}
          >
            My Cards ({myCards.length})
          </button>
        </div>
      )}

      <div className="cards-grid">
        {displayCards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onLike={user ? handleLike : undefined}
            isLiked={user ? card.likes.includes(user._id) : false}
            onDelete={user && user._id === card.userId ? deleteCard : undefined}
          />
        ))}
      </div>

      {displayCards.length === 0 && (
        <div className="empty-state">
          <p>No cards found</p>
        </div>
      )}
    </div>
  );
};
