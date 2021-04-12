import React, { useState, useEffect } from "react";
import styles from "../styles/Create.module.css";

export default function Create() {
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
            <div className={styles.bar}>
              <div className={styles.triangle}></div>
              <p>Round 1</p>
            </div>

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
