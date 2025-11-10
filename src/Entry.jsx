import styles from './entry.module.css';

const Entry = ({ action, query, setQuery, setAction, deleteEntry }) => {

  return (
    <div className={styles.entry}>

      <input
        className={styles.key}
        value={action}
        onChange={e => setAction(e.target.value)}
      />

      <textarea
        className={styles.value}
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <button className={styles.delete} onClick={deleteEntry}>Delete</button>

    </div>
  );
};

export default Entry;
