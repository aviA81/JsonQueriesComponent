import { useEffect, useState, useRef } from 'react';
import Entry from './Entry';
import Dialog from './Dialog';
import styles from './app.module.css';
import { generateId, loadDataHook, postQueries } from './hooks';

function App() {
  const [queries, setQueries] = useState([]);
  const defaultQueriesRef = useRef({});
  const [displayDialog, setDisplayDialog] = useState(false);
  const [refreshQueries, setRefreshQueries] = useState(0);

  // fetch the queries
  useEffect(() => {
    async function fetchQueries() {
      const json = await loadDataHook();
      if (json.success) {
        const list = Object.entries(json.data).map(([action, query]) => ({
          id: generateId(),
          action,
          query
        }));
        setQueries(list);
        defaultQueriesRef.current = list;
      }
    }
    fetchQueries();
  }, [refreshQueries]);

  // Add an entry
  function addEntry() {
    const id = generateId();
    setQueries(prev => [{ id, action: "Action", query: "Query" }, ...prev]);
    scroll(0, 0);
  }

  // Change the value of a query
  function setQuery(id, newQuery) {
    setQueries(prev =>
      prev.map(item =>
        item.id === id ? { ...item, query: newQuery } : item
      )
    );
  }

  // Rename an action
  function setAction(id, newAction) {
    setQueries(prev =>
      prev.map(item =>
        item.id === id ? { ...item, action: newAction } : item
      )
    );
  }

  // Delete an entry
  function deleteEntry(id) {
    setQueries(prev => prev.filter(item => item.id !== id));
  }

  async function PostAndRefreshQueries() {
    // Transform array back to original { action: query } format
    const obj = Object.fromEntries(queries.map(q => [q.action, q.query]));
    await postQueries(obj);
    setRefreshQueries(r => r + 1);
  }

  return (
    <>
      <div className={styles.header}>
        <button onClick={() => console.log(queries)}>log state</button>
        <button onClick={addEntry}>Add Entry</button>
        <button onClick={() => setDisplayDialog(true)}>Post Queries</button>
        <span className={styles.pending}>
          {JSON.stringify(defaultQueriesRef.current) !== JSON.stringify(queries)
            &&
            'Pending Changes'}
        </span>
      </div>

      <div className={styles.page}>

        {queries.map(item => (
          <Entry
            key={item.id}
            action={item.action}
            query={item.query}
            setQuery={q => setQuery(item.id, q)}
            setAction={a => setAction(item.id, a)}
            deleteEntry={() => deleteEntry(item.id)}
          />
        ))}

        {displayDialog &&
          <Dialog
            postQueries={PostAndRefreshQueries}
            close={() => setDisplayDialog(false)}
          />}

      </div>
    </>
  );
}

export default App;
