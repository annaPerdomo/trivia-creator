import React, { useState, useEffect } from "react";
import styles from "../styles/Wait.module.css";
const {
  wait,
  left,
  dot,
  teamList,
  teamButton,
  teamButtonText,
  waitBox,
  selected,
  spacer,
  winner,
  round,
  filler,
  onBlack
} = styles;

export default function WaitBetweenRounds() {

  const [currentRound, setCurrentRound] = useState(null);

  return (
    <div id={wait}>
      <div id={left}>
        <div className={spacer}></div>
        <div id={teamList}>
          <div className={teamButton}>
            <div className={dot}></div>
            <div className={teamButtonText}>
              <p>Quizly Bears: The Beginning</p>
              <p>3 members</p>
            </div>
            <div className={winner}></div>
          </div>
          <div className={`${teamButton} ${selected}`}>
            <div className={dot}></div>
            <div className={teamButtonText}>
              <p>Quizly Bears: The Beginning</p>
              <p>3 members</p>
            </div>
          </div>
          <div className={teamButton}>
            <div className={dot}></div>
            <div className={teamButtonText}>
              <p>Quizly Bears: The Beginning</p>
              <p>3 members</p>
            </div>
          </div>
          <div className={teamButton}>
            <div className={dot}></div>
            <div className={teamButtonText}>
              <p>Quizly Bears: The Beginning</p>
              <p>3 members</p>
            </div>
          </div>
        </div>
        <div className={spacer}></div>
      </div>
      <div id={round}>
        <div id={filler}>
          <span className={onBlack}></span>
          <span className={onBlack}></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p> Round 2 of 5</p>
      </div>
      <div id={waitBox} className={onBlack}><p>Waiting for Round Start</p><span>...</span></div>
    </div>
  );
}