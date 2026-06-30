'use client'
import { useState } from 'react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT

  if (!endpoint) {
    return (
      <div className="bg-surface border border-surface p-8 text-center">
        <p className="text-text-muted">
          Configuration error — contact me directly at{' '}
          <a
            href="mailto:chiel.bleumink@cbtestconsultancy.nl"
            className="text-accent hover:underline"
          >
            chiel.bleumink@cbtestconsultancy.nl
          </a>
        </p>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState('submitting')

    const formData = new FormData(e.currentTarget)

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
      setState(res.ok ? 'success' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="bg-surface border border-accent p-8 text-center">
        <p className="font-display font-bold text-white text-xl mb-2">Message sent ✓</p>
        <p className="text-text-muted">I&apos;ll get back to you as soon as possible.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-mono text-text-muted tracking-widest uppercase">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="bg-surface border border-surface focus:border-accent outline-none px-4 py-3 text-text-primary transition-colors"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-mono text-text-muted tracking-widest uppercase">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="bg-surface border border-surface focus:border-accent outline-none px-4 py-3 text-text-primary transition-colors"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-mono text-text-muted tracking-widest uppercase">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="bg-surface border border-surface focus:border-accent outline-none px-4 py-3 text-text-primary transition-colors resize-none"
        />
      </div>

      {state === 'error' && (
        <p className="text-red-400 text-sm">Something went wrong — please try again or email me directly.</p>
      )}

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="bg-accent text-background px-8 py-4 font-semibold text-lg hover:bg-accent-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed self-start"
      >
        {state === 'submitting' ? 'Sending…' : 'Send message →'}
      </button>
    </form>
  )
}
