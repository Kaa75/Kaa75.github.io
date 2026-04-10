'use client';

import { useState, type FormEvent } from 'react';

interface FormState {
  status: 'idle' | 'sending' | 'success' | 'error';
  message: string;
}

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState<FormState>({ status: 'idle', message: '' });

  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Basic client-side validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setState({ status: 'error', message: 'All fields are required.' });
      return;
    }

    // Email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      setState({ status: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    // If no endpoint, fall back to mailto
    if (!endpoint) {
      const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
      );
      window.location.href = `mailto:karimabboud05@gmail.com?subject=${subject}&body=${body}`;
      setState({ status: 'success', message: 'Opening your email client...' });
      return;
    }

    setState({ status: 'sending', message: '' });

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      if (!res.ok) throw new Error('Failed to send');

      setState({ status: 'success', message: 'Message sent! I\'ll get back to you soon.' });
      setForm({ name: '', email: '', message: '' });
    } catch {
      setState({
        status: 'error',
        message: 'Something went wrong. Please try emailing me directly.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          autoComplete="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted))] focus:border-accent focus:outline-none transition-colors duration-200"
          placeholder="Your name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted))] focus:border-accent focus:outline-none transition-colors duration-200"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted))] focus:border-accent focus:outline-none transition-colors duration-200 resize-y"
          placeholder="Tell me about your project or idea..."
        />
      </div>

      {state.message && (
        <p
          role="alert"
          className={`text-sm ${
            state.status === 'success' ? 'text-emerald-400' : 'text-red-400'
          }`}
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={state.status === 'sending'}
        className="inline-flex items-center px-6 py-3 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state.status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
