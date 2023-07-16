import React from "react";
import "@/assets/css/CardStat.css";

interface CardProps {
  views: number;
  title: string;
  percentage: number;
  darkMode: boolean; // Propriété indiquant si le mode sombre est activé
}

const Card: React.FC<CardProps> = ({ views, title, percentage, darkMode }) => {
  return (
    <div className={`card ${darkMode ? "dark-mode" : ""}`}>
      <div className={`top-left ${darkMode ? "dark-mode" : ""}`}>
        <div className={`title ${darkMode ? "dark-mode" : ""}`}>{title}</div>
      </div>
      <span className={`views ${darkMode ? "dark-mode" : ""}`}>{views}</span>
      <div className={`bottom ${darkMode ? "dark-mode" : ""}`}>
        <span className={`percentage ${darkMode ? "dark-mode" : ""}`}>
          {percentage}%
        </span>
        <span className={`label ${darkMode ? "dark-mode" : ""}`}>
          Last Week
        </span>
      </div>
    </div>
  );
};

export default Card;
