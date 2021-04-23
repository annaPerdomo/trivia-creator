import React, { useState, useEffect } from "react";
import styles from "../../styles/Create.module.css";
const {} = styles;

export default function Question(props) {
   const [open, setOpen] = useState(false);
   return (
      <div className={styles.question} onClick={()=>{setOpen(!open)}}>
      {props.num}. {props.text}
      {open ? <div className={styles.questionDetails}>[{props.text}{props.text}]</div> : null}
      </div>
  )
}