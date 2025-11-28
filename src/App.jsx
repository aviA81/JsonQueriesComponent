import { useEffect, useState, useRef } from 'react';
import Entry from './Entry';
import Dialog from './Dialog';
import styles from './app.module.css';
import { generateId, loadDataHook, postQueries } from './hooks';

function App() {
  const [queries, setQueries] = useState({});
  const keyMapRef = useRef({});
  const [displayDialog, setDisplayDialog] = useState(false);

  // fetch the queries
  useEffect(() => {
    async function fetchQueries() {
      const json = await loadDataHook();
      if (json.success) {
        setQueries(json.data);
      }
    }
    fetchQueries();
  }, []);

  // Change the value of a query
  function setQuery(key, value) {
    setQueries({ ...queries, [key]: value });
  }

  // Change the name of an action
  function setAction(oldKey, newKey) {
    keyMapRef.current[newKey] = keyMapRef.current[oldKey];
    delete keyMapRef.current[oldKey];

    // Reconstructing the object so that the entries are in the same order in the new object so React will render them in the same order.
    const newEntries = Object.entries(queries).map(([key, value]) => {
      if (key === oldKey) return [newKey, value];
      return [key, value];
    });

    const updated = Object.fromEntries(newEntries);
    setQueries(updated);
  }

  // Add an entry
  function addEntry() {
    setQueries({ ...queries, 'Action': 'Query' });
  }

  // Delete an entry
  function deleteEntry(action) {
    delete keyMapRef.current[action];

    const newEntries = Object.entries(queries).filter(([key]) => key !== action);
    const updated = Object.fromEntries(newEntries);
    setQueries(updated);
  }

  Object.keys(queries).forEach(key => {
    if (!keyMapRef.current[key]) keyMapRef.current[key] = generateId();
  });

  return (
    <>
      <div className={styles.header}>
        <button onClick={() => console.log(queries)}>log state</button>
        <button onClick={addEntry}>Add Entry</button>
        <button onClick={() => setDisplayDialog(true)}>Post Queries</button>
      </div>

      <div className={styles.page}>

        {Object.entries(queries).map(([action, query]) => (
          <Entry
            key={keyMapRef.current[action]}
            action={action}
            query={query}
            setQuery={(newQuery) => setQuery(action, newQuery)}
            setAction={(newAction) => setAction(action, newAction)}
            deleteEntry={() => deleteEntry(action)}
          />
        ))}

        {displayDialog &&
          <Dialog
            postQueries={() => postQueries(queries)}
            close={() => setDisplayDialog(false)}
          />}

      </div>
    </>
  );
}

export default App;
