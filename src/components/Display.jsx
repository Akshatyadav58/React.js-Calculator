import styles from "./Display.module.css";

const Display = ({ value }) => {
  return <input className={styles.display} type="text" value={value} readOnly />;
};

export default Display;
