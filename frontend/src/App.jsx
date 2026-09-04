import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEmails = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:3000/api/emails");

      if (!response.ok) {
        throw new Error("Unable to fetch emails. Please try again.");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Unable to fetch emails.");
      }

      setEmails(data.emails || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <main className="app">
      <header className="hero">
        <div>
          <span className="badge">Full-Stack Email Testing</span>
          <h1>📬 Testmail API Email Viewer</h1>
          <p>
            Retrieve and inspect test emails through a secure Express API.
          </p>
        </div>

        <button
          className="refresh-button"
          onClick={fetchEmails}
          disabled={loading}
        >
          {loading ? "Loading..." : "🔄 Refresh Emails"}
        </button>
      </header>

      <section className="email-section">
        {loading && <p className="status">Loading emails...</p>}

        {error && (
          <div className="error-box">
            <strong>Something went wrong</strong>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="section-header">
            <div>
              <h2>Inbox</h2>
              <p>Emails found: {emails.length}</p>
            </div>
          </div>
        )}

        {!loading && !error && emails.length === 0 && (
          <div className="empty-state">
            <span>📭</span>
            <h2>No emails found</h2>
            <p>
              Send an email to your Testmail inbox and refresh this page.
            </p>
          </div>
        )}

        <div className="email-list">
          {emails.map((email) => (
            <article className="email-card" key={email.id}>
              <div className="email-card-header">
                <div>
                  <span className="label">FROM</span>
                  <h3>{email.from_parsed?.[0]?.name || email.from}</h3>
                  <p>{email.from_parsed?.[0]?.address}</p>
                </div>

                <time>
                  {new Date(email.date).toLocaleString()}
                </time>
              </div>

              <div className="email-content">
                <h2>{email.subject || "No Subject"}</h2>
                <p>{email.text || "No message content available."}</p>
              </div>

              <div className="email-meta">
                <span>🛡️ SPF: {email.SPF || "Unknown"}</span>
                <span>🔐 DKIM: {email.dkim || "Unknown"}</span>
                <span>📎 {email.attachments?.length || 0} attachments</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;