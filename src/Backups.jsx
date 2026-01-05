import styles from './dialog.module.css';

const Backups = ({ setCurrentBackupName, backupList, close }) => {
  return (
    <div className={styles.fullScreen}>
      <div className={styles.centerBox}>
        {
          Object.entries(backupList).map(([key,]) =>
            <button
              key={key}
              onClick={() => setCurrentBackupName(key)}
              className={styles.backupEntry}
            >
              {key === 'queries' ? 'Current' : key}
            </button>
          )
        }
        <button className={styles.button} onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default Backups;
