import { useEffect, useState, useRef } from 'react';
import Entry from './Entry';
const apiKey = import.meta.env.VITE_API_KEY;

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

async function loadDataHook() {
  const response = await fetch(`https://prapi.gldstools.com/queries?apiKey=${apiKey}`);
  const json = await response.json();
  console.log(json);
  return json;
}


async function postQueries(queries) {
  const body = {
    apiKey: apiKey,
    queries: queries
  };
  const response = await fetch(`http://localhost/endpoint?apikey=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  });
  const json = await response.json();
  console.log(json);
}

function App() {
  const [queries, setQueries] = useState({});
  const keyMapRef = useRef({});

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

  Object.keys(queries).forEach(key => {
    if (!keyMapRef.current[key]) keyMapRef.current[key] = generateId();
  });

  return (
    <>
      <button onClick={() => console.log(queries)}>show state</button>
      <button onClick={addEntry}>Add Entry</button>
      <button onClick={() => postQueries(queries)}>Post Queries</button>

      {Object.entries(queries).map(([action, query]) => (
        <Entry
          key={keyMapRef.current[action]}
          action={action}
          query={query}
          setQuery={(newQuery) => setQuery(action, newQuery)}
          setAction={(newAction) => setAction(action, newAction)}
        />
      ))}
    </>
  );
}

export default App;
