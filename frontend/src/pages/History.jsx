import { useEffect, useState } from "react";
import api from "../api";

export default function History() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get("/smtp/history")
      .then((r) => setItems(r.data))
      .catch(() => {});
  }, []);

  return (
    <section className="page-card">
      <h2>History</h2>
      <p className="page-description">Recent SMTP requests and responses.</p>
      <pre className="output">{JSON.stringify(items, null, 2)}</pre>
    </section>
  );
}
