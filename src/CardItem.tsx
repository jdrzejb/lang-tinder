import { useState, FC } from "react";
import ReactCardFlip from "react-card-flip";
import { speakText } from "./speak";

interface CardItemProps {
  foreign: string;
  english: string;
}

const CardItem: FC<CardItemProps> = ({ foreign, english }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(true);

  const handleClick = () => {
    if (isFlipped) speakText(foreign, "en");
    setIsFlipped(!isFlipped);
  };

  const cardClasses =
    "w-72 h-96 flex items-center justify-center border border-gray-300 rounded-lg text-2xl cursor-pointer select-none";

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      {/* Front side */}
      <div
        onClick={handleClick}
        onTouchEnd={handleClick}
        className={`${cardClasses} bg-white`}
      >
        {foreign}
      </div>

      {/* Back side */}

      <div
        onClick={handleClick}
        onTouchEnd={handleClick}
        className={`${cardClasses} bg-gray-50`}
      >
        {english}
      </div>
    </ReactCardFlip>
  );
};

export default CardItem;
