import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import CardItem from "./CardItem";
import { words } from "./words";

interface CardData {
  id: number;
  translated: string;
  org: string;
}

interface SwipeRecord {
  card: CardData;
  direction: "left" | "right";
}

const STORAGE_KEY = "flashcardProgress";

const App: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>(words);
  const [stillToLearn, setStillToLearn] = useState<CardData[]>([]);
  const [learned, setLearned] = useState<CardData[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [swipeHistory, setSwipeHistory] = useState<SwipeRecord[]>([]);

  const handleSwipe = (direction: string, card: CardData) => {
    if (direction === "right") {
      setLearned((prev) => [...prev, card]);
    } else if (direction === "left") {
      setStillToLearn((prev) => [...prev, card]);
    }

    // Remove the swiped card from the main deck
    setCards((prev) => prev.filter((c) => c.id !== card.id));
    setSwipeHistory((prev) => [
      ...prev,
      { card, direction: direction as "left" | "right" },
    ]);
  };

  const handleGoBack = () => {
    if (swipeHistory.length === 0) return;

    // Get the last swipe action
    const lastAction = swipeHistory[swipeHistory.length - 1];
    const { card, direction } = lastAction;

    if (direction === "right") {
      setLearned((prev) => prev.filter((c) => c.id !== card.id));
    } else if (direction === "left") {
      setStillToLearn((prev) => prev.filter((c) => c.id !== card.id));
    }

    setCards((prev) => [...prev, card]);
    setSwipeHistory((prev) => prev.slice(0, prev.length - 1));
  };

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const { stillToLearn: savedStillToLearn, learned: savedLearned } =
        JSON.parse(savedData) as {
          stillToLearn: CardData[];
          learned: CardData[];
        };
      setStillToLearn(savedStillToLearn);
      setLearned(savedLearned);
      setCards((prev) => {
        const allCards = [...savedStillToLearn, ...savedLearned];
        return prev.filter((card) => !allCards.some((c) => c.id === card.id));
      });
      setInitialized(true);
    }
  }, []);

  // Save data to localStorage whenever stillToLearn or learned changes
  useEffect(() => {
    if (!initialized) return;
    const dataToSave = {
      stillToLearn,
      learned,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [stillToLearn, learned, initialized]);

  const reset = () => {
    setStillToLearn([]);
    setLearned([]);
    setCards(words);
    setSwipeHistory([]);
  };

  const l = cards.length;

  return (
    <div className="w-full bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Language Flashcards</h1>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
      >
        Reset
      </button>

      <div className="relative w-72 h-96 mt-6" style={{ touchAction: "pan-y" }}>
        {cards.slice(l - 3, l).map((card) => (
          <TinderCard
            swipeRequirementType="position"
            swipeThreshold={10}
            className="absolute"
            key={`${card.id}-${learned.length}-${stillToLearn.length}`}
            onSwipe={(dir: string) => handleSwipe(dir, card)}
            preventSwipe={["up", "down"]}
          >
            <CardItem foreign={card.translated} english={card.org} />
          </TinderCard>
        ))}
      </div>

      <div className="mt-5">
        <button
          onClick={handleGoBack}
          disabled={swipeHistory.length === 0}
          className="px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 disabled:opacity-50"
        >
          Go Back
        </button>
      </div>

      <div className="mt-12 w-4/5 justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2">Still To Learn</h2>
          <ul className="list-disc pl-6">
            {stillToLearn.map((item) => (
              <li key={item.id}>
                {item.translated} ({item.org})
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Learned</h2>
          <ul className="list-disc pl-6">
            {learned.map((item) => (
              <li key={item.id}>
                {item.translated} ({item.org})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
