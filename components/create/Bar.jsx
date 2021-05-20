import React, { useState, useEffect } from "react";
import styles from "../../styles/Create.module.css";
import Questions from "./Questions";

export default function Bar(props) {
  return (
    <div className={styles.barContainer}>
      <div
        className={
          props.selected ? `${styles.bar} ${styles.selected}` : styles.bar
        }
        onClick={props.onClick}
      >
        <div
          className={
            props.selected
              ? `${styles.triangle} ${styles.selected}`
              : styles.triangle
          }
        ></div>
        <p>{props.roundNum}</p>
        <p>Round</p>
      </div>
      {props.selected ? (
        <Questions
          questionNumberList={[1, 2, 3, 4, 5]}
          currentRound={props.currentRound}
          questions={props.questions}
        />
      ) : null}
    </div>
  );
}