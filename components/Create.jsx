import React, { useState, useEffect } from "react";
import styles from "../styles/Create.module.css";

export default function Create() {
  const [currentRound, setCurrentRound] = useState(null);
  console.log({currentRound})

  return (
    <div className={styles.secret}>
      <div id={styles.upper}>
        <div id={styles.menu}>
          <p>Menu</p>
        </div>
        <div id={styles.start}>
          <p>Start Game</p>
        </div>
      </div>

      <div id={styles.lower}>
        <div id={styles.upload}>
          <p>Upload</p>
        </div>
        <div id={styles.bigRec}>
          <div className={styles.bars}>
            {currentRound === 1 ? (
              <React.Fragment>
                <div className={styles.bar} className={`${styles.bar} ${styles.selected}`}  onClick={() => setCurrentRound(null)}>
                  <div
                    className={`${styles.triangle} ${styles.selected}`}
                  ></div>
                  <p>Round 1</p>
                </div>
                <div className={styles.questionOverview}>
                  <div>
                    <p>
                      1. What is the flattest state in the Union?
                    </p>
                  </div>
                  <div>
                    <p>
                      1. What is the tallest state in the Union?
                    </p>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <div className={styles.bar} onClick={() => setCurrentRound(1)}>
                <div
                  className={styles.triangle}
                ></div>
                <p>Round 1</p>
              </div>
            )}

            <div className={styles.bar}>
              <div className={styles.triangle}></div>
              <p>Round 2</p>
            </div>
            <div className={styles.bar}>
              <div className={styles.triangle}></div>
              <p>Round 3</p>
            </div>

            <div className={styles.bar}>
              <div className={styles.triangle}></div>
              <p>Round 4</p>
            </div>

            <div className={styles.bar}>
              <div className={styles.triangle}></div>
              <p>Round 5</p>
            </div>
          </div>

          <p id={styles.logo}>it's a trivia&trade;</p>
        </div>
      </div>
    </div>
  );
}
