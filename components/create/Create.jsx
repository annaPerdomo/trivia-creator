import React, { useState, useEffect } from "react";
import styles from "../../styles/Create.module.css";
import Bar from "./Bar.jsx";
const {
  create,
  title,
  start,
  upload,
  bigRec,
  bars,
  logo
} = styles;


export default function Create({ questions }) {
  const [currentRound, setCurrentRound] = useState(null);

  function barClick(i) {
    if (currentRound === i) {
      setCurrentRound(null);
    } else {
      setCurrentRound(i);
    }
  }

  return (
    <div id={create}>
      <div id={title}>
        <p>Create</p>
      </div>
      <div id={start}>
        <p>Start Game</p>
      </div>
      <div id={upload}>
        <p>Upload</p>
      </div>
      <div id={bigRec}>
        <div id={bars}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Bar
              currentRound={currentRound}
              questions={questions}
              onClick={() => {
                barClick(i);
              }}
              selected={currentRound === i ? true : false}
              num={i}
            />
          ))}
        </div>

        <p id={logo}>it's a trivia&trade;</p>
      </div>
    </div>
  );
}
