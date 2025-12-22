import { useState, useEffect } from "react";
import { Card } from "../types";
import { apiService } from "../services/api";

export const useCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getCards();
      setCards(data);
      setError(null);
    } catch (err: any) {
      console.log("Error details:", err);
      setError(err.response?.data?.message || "Error loading cards");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const deleteCard = async (cardId: string) => {
    try {
      await apiService.deleteCard(cardId);
      setCards(cards.filter((card) => card._id !== cardId));
    } catch (err: any) {
      setError(err.response?.data?.message || "Error deleting card");
    }
  };

  const likeCard = async (cardId: string) => {
    try {
      const updatedCard = await apiService.likeCard(cardId);
      setCards(cards.map((card) => (card._id === cardId ? updatedCard : card)));
    } catch (err: any) {
      setError(err.response?.data?.message || "Error liking card");
    }
  };

  const unlikeCard = async (cardId: string) => {
    try {
      const updatedCard = await apiService.unlikeCard(cardId);
      setCards(cards.map((card) => (card._id === cardId ? updatedCard : card)));
    } catch (err: any) {
      setError(err.response?.data?.message || "Error unliking card");
    }
  };

  return {
    cards,
    isLoading,
    error,
    fetchCards,
    deleteCard,
    likeCard,
    unlikeCard,
  };
};
