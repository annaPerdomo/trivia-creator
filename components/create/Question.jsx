import React, { useState, useEffect } from "react";
import styles from "../../styles/Create.module.css";
import AddQuestionModal from './AddQuestionModal';
const {
   backdrop,
   modal,
   question,
   questionDetails
} = styles;

export default function Question({ text, num }) {
  const [open, setOpen] = useState(false);
  console.log({ text });
  return (
    <div
      className={question}
      onClick={() => {
        setOpen(!open);
      }}
    >
      {num}. {text}
      {open ? (
        <div className={questionDetails}>
          <AddQuestionModal selector="#modal">
            <div className={backdrop}>
              <div className={modal}>
                <p>
                  This modal is rendered using{' '}
                  <a
                    href="https://reactjs.org/docs/portals.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    portals
                  </a>
                  .
                </p>
                <button type="button" onClick={() => setOpen(!open)}>
                  Close Modal
                </button>
              </div>
            </div>
          </AddQuestionModal>
        </div>
      ) : (
        <div>{`[Where the answer will be if there is one]`}</div>
      )}
    </div>
  );
}