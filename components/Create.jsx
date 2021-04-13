import React, { useState, useEffect } from "react";
import styles from "../styles/Create.module.css";
const {
  secret,
  upper,
  menu,
  start,
  lower,
  upload,
  bigRec,
  bars,
  bar,
  selected,
  triangle,
  logo,
} = styles;

export default function Create() {
  const [currentRound, setCurrentRound] = useState(null);

  return (
    <div className={secret}>
      <div id={upper}>
        <div id={menu}>
          <p>Menu</p>
        </div>
        <div id={start}>
          <p>Start Game</p>
        </div>
      </div>

      <div id={lower}>
        <div id={upload}>
          <p>Upload</p>
        </div>
        <div id={bigRec}>
          <div className={bars}>
            {currentRound === 1 ? (
              <React.Fragment>
                <div className={bar} className={`${bar} ${selected}`}  onClick={() => setCurrentRound(null)}>
                  <div
                    className={`${triangle} ${selected}`}
                  ></div>
                  <p>Round 1</p>
                </div>
                <div>
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
              <div className={bar} onClick={() => setCurrentRound(1)}>
                <div
                  className={triangle}
                ></div>
                <p>Round 1</p>
              </div>
            )}

            <div className={bar}>
              <div className={triangle}></div>
              <p>Round 2</p>
            </div>
            <div className={bar}>
              <div className={triangle}></div>
              <p>Round 3</p>
            </div>

            <div className={bar}>
              <div className={triangle}></div>
              <p>Round 4</p>
            </div>

            <div className={bar}>
              <div className={triangle}></div>
              <p>Round 5</p>
            </div>
          </div>

          <p id={logo}>it's a trivia&trade;</p>
        </div>
      </div>
    </div>
  );
}
