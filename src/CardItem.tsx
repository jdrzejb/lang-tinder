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

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div
        onClick={handleClick}
        onTouchStart={handleClick}
        style={{
          width: "300px",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #ccc",
          borderRadius: "10px",
          background: "#fff",
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        {foreign}
      </div>

      <div
        onClick={handleClick}
        style={{
          width: "300px",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #ccc",
          borderRadius: "10px",
          background: "#fafafa",
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        {english}
      </div>
    </ReactCardFlip>
  );
};

export default CardItem;
