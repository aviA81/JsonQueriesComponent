import React, { useState } from 'react';
import styles from './entry.module.css';

const Entry = ({ action, query }) => {
  const [actionState, setActionState] = useState(action);
  const [queryState, setQueryState] = useState(query);
  return (
    <div className={styles.entry}>

      <input
        className={styles.key}
        value={actionState}
        onChange={e => setActionState(e.target.value)}
      />

      <textarea
        className={styles.value}
        value={queryState}
        onChange={e => setQueryState(e.target.value)}
      />

    </div>
  );
};

export default Entry;
