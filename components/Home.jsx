import React from 'react';
import styles from "../styles/Home.module.css";
const {
  buttonContainer,
  buttonSection,
  homePageButtons,
  divider,
  welcomeBanner,
} = styles;

export default function Home() {
  return (
    <div>
      <div className={welcomeBanner}>
        <h1>Welcome to Trivia DeathMatch&trade;</h1>
      </div>
      <div className={buttonContainer}>
        <div className={buttonSection}>
          <button className={homePageButtons}>Create A Game</button>
        </div>
        <div className={divider}></div>
        <div className={buttonSection}>
          <button className={homePageButtons}>Start A Game</button>
        </div>
      </div>
    </div>
  );
}


