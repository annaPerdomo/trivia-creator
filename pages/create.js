import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Create.module.css";

export default function Create() {
  useEffect(()=>{
    const script = document.createElement("script");
    script.src = "C:\Users\Corrie\trivia-creator\components\create.js";
    document.body.appendChild(script);
    return ()=>{document.body.removeChild(script)};
  },[])

  const title =
    "Trivia Creator | Create trivia questions & answers and then play with a group | Trivia";
  const desc =
    "Trivia creator allows you to host trivia nights with your friends!";
  //Module parse failed: Unexpected character '�' (1:0)
  //You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
  //getting error above trying to change this
  // const image = require(`../public/testBrain.jpg`);
  const url = "www.notsure.help";
  const keywords = "trivia";
  const robots = "index, follow";

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta content={desc} name="description" />
        <meta content={keywords} name="keywords" />
        <meta content={robots} name="robots" />
        {/*
        <meta content={title} property="og:title" />
        <meta content="website" property="og:type" />
        <meta content={url} property="og:url" />
        <meta content={desc} property="og:description" />
        <meta content={image} property="og:image" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="getjobfit.com" name="twitter:domain" />
        <meta content={title} name="twitter:title" />
        <meta content={desc} name="twitter:description" />
        <meta content={image} name="twitter:image" />
        <meta content={url} name="twitter:url" /> */}
        <link rel="stylesheet" href="../styles/create.css"></link>
      </Head>

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
      <script>


      </script>
    </React.Fragment>
  );
}
