import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import CardItem from "./CardItem";
import { words } from "./words";
import { loadFromIndexedDB, saveToIndexedDB } from "./db";

export interface CardData {
  id: number;
  translated: string;
  org: string;
}

interface SwipeRecord {
  card: CardData;
  direction: "left" | "right";
}

export interface SavedData {
  stillToLearn: CardData[];
  learned: CardData[];
}

const STORAGE_KEY = "flashcardProgress";

// Sprawdza czy localStorage działa poprawnie
function storageIsAvailable() {
  try {
    const testKey = "__storage_test__";
    localStorage.setItem(testKey, testKey);
    const result = localStorage.getItem(testKey) === testKey;
    localStorage.removeItem(testKey);
    return result;
  } catch (e) {
    return false;
  }
}

const App: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>(words);
  const [stillToLearn, setStillToLearn] = useState<CardData[]>([]);
  const [learned, setLearned] = useState<CardData[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [swipeHistory, setSwipeHistory] = useState<SwipeRecord[]>([]);
  const [useLocal, setUseLocal] = useState<boolean>(true);

  const handleSwipe = (direction: string, card: CardData) => {
    if (direction === "right") {
      setLearned((prev) => [...prev, card]);
    } else if (direction === "left") {
      setStillToLearn((prev) => [...prev, card]);
    }

    // Usuwa przeciągniętą kartę z głównej talii
    setCards((prev) => prev.filter((c) => c.id !== card.id));
    setSwipeHistory((prev) => [
      ...prev,
      { card, direction: direction as "left" | "right" },
    ]);
  };

  const handleGoBack = () => {
    if (swipeHistory.length === 0) return;

    // Ostatnia akcja przeciągnięcia
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

  // Ładuje dane z localStorage przy starcie
  useEffect(() => {
    const canUseLocalStorage = storageIsAvailable();
    setUseLocal(false);

    (async () => {
      if (canUseLocalStorage) {
        // Próba ładowania z localStorage
        const savedDataStr = localStorage.getItem(STORAGE_KEY);
        if (savedDataStr) {
          const { stillToLearn: stl, learned: l } = JSON.parse(savedDataStr);
          setStillToLearn(stl);
          setLearned(l);
          setCards((prev) =>
            prev.filter((card) => ![...stl, ...l].some((c) => c.id === card.id))
          );
        }
      } else {
        // Ładowanie z IndexedDB
        const savedData = await loadFromIndexedDB();
        if (savedData) {
          const { stillToLearn: stl, learned: l } = savedData;
          setStillToLearn(stl);
          setLearned(l);
          setCards((prev) =>
            prev.filter((card) => ![...stl, ...l].some((c) => c.id === card.id))
          );
        }
      }
      setInitialized(true);
    })();
  }, []);

  useEffect(() => {
    if (!initialized) return;

    const dataToSave: SavedData = {
      stillToLearn,
      learned,
    };

    if (useLocal) {
      // LocalStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      } catch (error) {
        console.error("Błąd zapisu do localStorage:", error);
      }
    } else {
      // IndexedDB fallback
      saveToIndexedDB(dataToSave).catch((err) =>
        console.error("Błąd zapisu do IndexedDB:", err)
      );
    }
  }, [stillToLearn, learned, initialized, useLocal]);

  const reset = () => {
    setStillToLearn([]);
    setLearned([]);
    setCards(words);
  };

  // Funkcja do rozpoczęcia od słówek do nauki
  const resumeFromStillToLearn = () => {
    setCards(stillToLearn);
    setStillToLearn([]);
    setSwipeHistory([]);
  };

  const l = cards.length;

  return (
    <div className="w-full bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Fiszki językowe</h1>
      <div className="flex gap-4 mb-6">
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
        >
          Zresetuj
        </button>
        <button
          onClick={resumeFromStillToLearn}
          disabled={stillToLearn.length === 0}
          className="px-4 py-2 bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 disabled:opacity-50"
        >
          Wznów od słówek do nauki
        </button>
      </div>

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

        {l === 0 && (
          <div className="absolute w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold">Brak kart!</h2>
          </div>
        )}
      </div>

      <div className="mt-5">
        <button
          onClick={handleGoBack}
          disabled={swipeHistory.length === 0}
          className="px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 disabled:opacity-50"
        >
          Cofnij
        </button>
      </div>

      <div className="mt-12 w-4/5 justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2">Do nauczenia</h2>
          <ul className="list-disc pl-6">
            {stillToLearn.map((item) => (
              <li key={item.id}>
                {item.translated} ({item.org})
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Nauczone</h2>
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
