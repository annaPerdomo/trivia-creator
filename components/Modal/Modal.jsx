import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux'

export default function Modal({ children, selector }) {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);
  const isAddQuestionModalOpen = useSelector(
    (state) => state.createGame.isAddQuestionModalOpen
  );

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(isAddQuestionModalOpen);
  }, [isAddQuestionModalOpen]);

  return mounted ? createPortal(children, ref.current) : null;
}