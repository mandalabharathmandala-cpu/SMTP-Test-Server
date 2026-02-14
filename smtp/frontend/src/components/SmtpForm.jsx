import { useState } from "react";
import api from "../api";

export default function SmtpForm() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);

  const handleSubmit = async (type) => {
    const endpoint = type === "test" ? "/smtp/test" : "/smtp/send";
    try {
      const res = await api.post(endpoint, form);
      setResult(res.data);
    } catch (err) {
      setResult(err.response?.data || { error: err.message });
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <input placeholder="SMTP Host" onChange={e => setForm({...form, host: e.target.value})} />
      <input placeholder="Port" onChange={e => setForm({...form, port: e.target.value})} />
      <input placeholder="Username" onChange={e => setForm({...form, username: e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
      <input placeholder="From" onChange={e => setForm({...form, from: e.target.value})} />
      <input placeholder="To" onChange={e => setForm({...form, to: e.target.value})} />
      <input placeholder="Subject" onChange={e => setForm({...form, subject: e.target.value})} />
      <textarea placeholder="Message" onChange={e => setForm({...form, message: e.target.value})} />
      <button onClick={() => handleSubmit("test")}>Test</button>
      <button onClick={() => handleSubmit("send")}>Send</button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
