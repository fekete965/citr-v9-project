import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children }) {
  const elRef = useRef(null);

  if (elRef.current == null) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    return () => {
      modalRoot.removeChild(elRef.current);
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
}

export { Modal };
