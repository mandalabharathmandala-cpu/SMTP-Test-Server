import { useState } from "react";
import api from "../api";

export default function SmtpForm() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

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
    <>
      <div className="smtp-form">
        <label>
          SMTP Host
          <input placeholder="smtp.example.com" onChange={(e) => updateField("host", e.target.value)} />
        </label>
        <label>
          Port
          <input placeholder="587" onChange={(e) => updateField("port", e.target.value)} />
        </label>
        <label>
          Username
          <input placeholder="user@example.com" onChange={(e) => updateField("username", e.target.value)} />
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => updateField("password", e.target.value)}
          />
        </label>
        <label>
          From
          <input placeholder="sender@example.com" onChange={(e) => updateField("from", e.target.value)} />
        </label>
        <label>
          To
          <input placeholder="receiver@example.com" onChange={(e) => updateField("to", e.target.value)} />
        </label>
        <label className="full-width">
          Subject
          <input placeholder="Subject" onChange={(e) => updateField("subject", e.target.value)} />
        </label>
        <label className="full-width">
          Message
          <textarea placeholder="Write your message here..." onChange={(e) => updateField("message", e.target.value)} />
        </label>
      </div>

      <div className="actions">
        <button type="button" className="secondary" onClick={() => handleSubmit("test")}>
          Test Connection
        </button>
        <button type="button" onClick={() => handleSubmit("send")}>
          Send Email
        </button>
      </div>

      {result && <pre className="output">{JSON.stringify(result, null, 2)}</pre>}
    </>
  );
}
