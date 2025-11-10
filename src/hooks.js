const apiKey = import.meta.env.VITE_API_KEY;
const productionUrl = 'https://prapi.gldstools.com/';
const developmentUrl = 'http://localhost:5192/';


export async function loadDataHook() {
  const response = await fetch(`${productionUrl}queries?apiKey=${apiKey}`);
  const json = await response.json();
  console.log(json);
  return json;
}

export async function postQueries(queries) {
  const body = {
    apiKey: apiKey,
    queries: queries
  };
  const response = await fetch(`${productionUrl}queries`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  });
  const json = await response.json();
  console.log(json);
}


export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}