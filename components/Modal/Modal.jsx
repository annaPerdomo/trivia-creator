import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux'

export default function Modal({ children, selector }) {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);
  const isModalOpen = useSelector(state => state.modal.isModalOpen);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(isModalOpen);
  }, [isModalOpen])

  return mounted ? createPortal(children, ref.current) : null;
}