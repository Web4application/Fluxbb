import React, { useState } from 'react';

function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    const email = e.target.email.value;
    const message = e.target.message.value;

    try {
      const res = await fetch('http://localhost:4567/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');

      setStatus('succeeded');
      e.target.reset();
    } catch (err) {
      setError(err.message);
      setStatus('idle');
    }
  };

  if (status === 'succeeded') {
    return <p>Thanks! Your message has been received.</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input name="email" type="email" placeholder="you@example.com" required />
      <textarea name="message" placeholder="Your message..." required />
      <button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending...' : 'Submit'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '400px',
    margin: 'auto',
  },
};

export default ContactForm;
