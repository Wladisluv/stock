import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={styles.notFoundWrap}>
      <div className={styles.notFoundInner}>
        <h1>Страница не найдена 🤔</h1>
      </div>
    </div>
  );
};

export default NotFound;
