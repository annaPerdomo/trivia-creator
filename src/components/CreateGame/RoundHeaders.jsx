import React, { useState, useEffect } from "react";
import styles from "../../styles/Create.module.css";
import Questions from "./Questions";
const {
  bar,
  barContainer,
  selected,
  triangle
} = styles;

export default function RoundHeaders(props) {
  return (
    <div className={barContainer}>
      <div
        className={props.selected ? `${bar} ${selected}` : bar}
        onClick={props.onClick}
      >
        <div
          className={props.selected ? `${triangle} ${selected}` : triangle}
        ></div>
        <p>{props.roundNum}</p>
        <p>Round</p>
      </div>
      {props.selected ? (
        <Questions
          questionNumberList={[1, 2, 3, 4, 5]}
          currentRound={props.openRoundNumber}
          questions={props.questions}
        />
      ) : null}
    </div>
  );
}