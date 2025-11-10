import styles from './dialog.module.css';

const Dialog = ({ postQueries, close }) => {
  return (
    <div className={styles.fullScreen}>
      <div className={styles.centerBox}>
        <h1 className={styles.header}>WARNING!</h1>
        <h2 className={styles.header}>This action will reset the queries on all active stores</h2>
        <p className={styles.paragraph}>Are you sure you want to continue?</p>
        <button className={styles.delete} onClick={() => { postQueries(); close(); }}>Yes</button>
        <button className={styles.delete} onClick={close}>No</button>
      </div>
    </div>
  );
};

export default Dialog;
