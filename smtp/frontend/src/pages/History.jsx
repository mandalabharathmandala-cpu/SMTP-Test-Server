import { useEffect, useState } from "react";
import api from "../api";

export default function History() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/smtp/history').then(r => setItems(r.data)).catch(() => {});
  }, []);

  return (
    <div>
      <h2>History</h2>
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
}
