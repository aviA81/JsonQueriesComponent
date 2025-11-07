import { useEffect, useState } from 'react';
import Entry from './Entry';
const apiKey = import.meta.env.VITE_API_KEY;


async function loadDataHook() {
  const response = await fetch(`http://localhost:5192/queries?apiKey=${apiKey}`);
  const json = await response.json();
  console.log(json);
  return json;
}

function App() {
  const [queries, setQueries] = useState({});

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

  return (
    <>
      {Object.entries(queries).map(([action, query]) => (
        <Entry key={action} action={action} query={query} />
      ))}
    </>
  );
}

export default App;
