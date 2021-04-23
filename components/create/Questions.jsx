import React from "react";
import styles from "../../styles/Create.module.css";
import Question from "./Question";

const {} = styles;

export default function Questions(props) {
   return (
     <div id={styles.questions}>
     {props.arr.map((item, index) => (<Question key={index} num={index+1} text={item}/>))}
     </div>
     )
}