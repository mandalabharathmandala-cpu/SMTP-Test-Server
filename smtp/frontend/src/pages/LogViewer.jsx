import { useEffect, useState } from "react";
import api from "../api";

export default function LogViewer({ id }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!id) return;
    api.get(`/smtp/history/${id}`).then(r => setItem(r.data)).catch(() => {});
  }, [id]);

  return (
    <div>
      <h2>Log Viewer</h2>
      <pre>{JSON.stringify(item, null, 2)}</pre>
    </div>
  );
}
