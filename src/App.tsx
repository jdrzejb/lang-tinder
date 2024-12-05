import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import CardItem from "./CardItem";
import "./App.css";
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
  const [cards, setCards] = useState<CardData[]>(
    words.map((w, i) => ({ id: i, ...w }))
  );

  const [stillToLearn, setStillToLearn] = useState<CardData[]>([]);
  const [learned, setLearned] = useState<CardData[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [swipeHistory, setSwipeHistory] = useState<SwipeRecord[]>([]);

  const handleSwipe = (direction: string, card: CardData) => {
    if (direction === "right") {
      // Add card to stillToLearn
      setLearned((prev) => [...prev, card]);
    } else if (direction === "left") {
      setStillToLearn((prev) => [...prev, card]);
      // Add card to learned
    }

    // Remove the swiped card from the main deck
    setCards((prev) => prev.filter((c) => c.id !== card.id));
    setSwipeHistory((prev) => [...prev, { card, direction: direction as any }]);
  };

  const handleGoBack = () => {
    if (swipeHistory.length === 0) return;

    // Get the last swipe action
    const lastAction = swipeHistory[swipeHistory.length - 1];
    const { card, direction } = lastAction;

    console.log("Undoing last action:", lastAction);

    // Undo the last action
    if (direction === "right") {
      // The card was previously added to learned, remove it from learned
      setLearned((prev) => prev.filter((c) => c.id !== card.id));
    } else if (direction === "left") {
      // The card was previously added to stillToLearn, remove it from there
      setStillToLearn((prev) => prev.filter((c) => c.id !== card.id));
    }

    // Put the card back into the deck (on top)
    setCards((prev) => [card, ...prev]);

    // Remove this action from history
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
  }, [stillToLearn, learned]);

  const reset = () => {
    setStillToLearn([]);
    setLearned([]);
    setCards(words.map((w, i) => ({ id: i, ...w })));
    setSwipeHistory([]);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#f0f0f0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Language Flashcards</h1>
      <button onClick={reset}>Reset</button>

      <div style={{ position: "relative", width: "300px", height: "400px" }}>
        {cards.map((card) => (
          <TinderCard
            className="swiper-card"
            key={card.id}
            onSwipe={(dir: string) => handleSwipe(dir, card)}
            preventSwipe={["up", "down"]}
          >
            <CardItem foreign={card.translated} english={card.org} />
          </TinderCard>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleGoBack} disabled={swipeHistory.length === 0}>
          Go Back
        </button>
      </div>

      <div
        style={{
          marginTop: "50px",
          width: "80%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2>Still To Learn</h2>
          <ul>
            {stillToLearn.map((item) => (
              <li key={item.id}>
                {item.translated} ({item.org})
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Learned</h2>
          <ul>
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
