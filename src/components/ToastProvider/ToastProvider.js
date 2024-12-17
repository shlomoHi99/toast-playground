import React from "react";
import { v7 as uuid } from "uuid";
import useKeyDown from "../../hooks/useKeyDown";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toastsArray, setToastsArray] = React.useState([]);
  useKeyDown("Escape", () => setToastsArray([]));

  function handleDismiss(toastId) {
    setToastsArray((toastsArray) =>
      toastsArray.filter((toast) => toast.id !== toastId)
    );
  }

  function addToast({ message, variant }) {
    setToastsArray([...toastsArray, { message, variant, id: uuid() }]);
  }

  return (
    <ToastContext.Provider value={{ toastsArray, handleDismiss, addToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
