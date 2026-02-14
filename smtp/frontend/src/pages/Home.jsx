import SmtpForm from "../components/SmtpForm";

export default function Home() {
  return (
    <section className="page-card">
      <h1>SMTP Testing</h1>
      <p className="page-description">
        Configure your SMTP settings and run a quick connection test or send a message.
      </p>
      <SmtpForm />
    </section>
  );
}
