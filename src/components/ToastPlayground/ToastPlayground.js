import React from "react";
import Button from "../Button";
import { ToastContext } from "../ToastProvider/ToastProvider";
import ToastShelf from "../ToastShelf/ToastShelf";
import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const { addToast } = React.useContext(ToastContext);
  const [toastData, setToastData] = React.useState({
    message: "",
    variant: "notice",
  });

  function isValidForm(toastData) {
    return !!(
      toastData?.message && VARIANT_OPTIONS.includes(toastData.variant)
    );
  }

  function setFormData(event, field) {
    const nextFormData = { ...toastData, [field]: event.target.value };
    setToastData(nextFormData);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValidForm(toastData)) return;
    addToast({ ...toastData });
    setToastData({ message: "", variant: "notice" });
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf />
      <form onSubmit={handleSubmit} className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              value={toastData.message}
              required
              onChange={(e) => setFormData(e, "message")}
              className={styles.messageInput}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option, index) => (
              <label key={index} htmlFor={`variant-${option}`}>
                <input
                  id={`variant-${option}`}
                  type="radio"
                  name="variant"
                  value={option}
                  required
                  checked={toastData.variant === option}
                  onChange={(e) => setFormData(e, "variant")}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button disabled={isValidForm()} type="submit">
              Pop Toast!
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
