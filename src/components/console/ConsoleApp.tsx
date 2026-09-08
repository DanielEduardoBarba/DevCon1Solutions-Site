'use client'

import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react'
import {
  ApiError,
  consoleApi,
  getConsoleToken,
  setConsoleToken,
  type AdminPublic,
  type ApiKeyRow,
  type EmailTemplateRow,
  type MailerStatus,
} from '../../lib/console-api'

type Tab = 'keys' | 'mailer' | 'templates' | 'security'
type AuthPhase = 'loading' | 'setup' | 'login' | 'mfa' | 'ready'

const inputClass =
  'w-full py-2.5 px-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-400/50 transition-all text-sm'
const labelClass = 'block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wide'
const btnPrimary =
  'px-4 py-2.5 rounded-lg bg-cyan-500/90 hover:bg-cyan-400 text-black font-semibold text-sm transition-colors disabled:opacity-50'
const btnGhost =
  'px-4 py-2.5 rounded-lg border border-white/15 hover:bg-white/5 text-white/80 text-sm transition-colors disabled:opacity-50'
const btnDanger =
  'px-3 py-1.5 rounded-lg border border-red-500/40 text-red-300 hover:bg-red-500/10 text-xs transition-colors'

function ErrorBanner({ message }: { message: string }) {
  if (!message) return null
  return (
    <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
      {message}
    </div>
  )
}

function SuccessBanner({ message }: { message: string }) {
  if (!message) return null
  return (
    <div className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
      {message}
    </div>
  )
}

export default function ConsoleApp() {
  const [phase, setPhase] = useState<AuthPhase>('loading')
  const [admin, setAdmin] = useState<AdminPublic | null>(null)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [busy, setBusy] = useState(false)

  // setup / login fields
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pendingToken, setPendingToken] = useState('')
  const [mfaMethod, setMfaMethod] = useState<'totp' | 'email'>('totp')
  const [mfaCode, setMfaCode] = useState('')
  const [emailHint, setEmailHint] = useState('')

  const [tab, setTab] = useState<Tab>('keys')

  const bootstrap = useCallback(async () => {
    setError('')
    try {
      const { setupRequired } = await consoleApi.status()
      if (setupRequired) {
        setConsoleToken(null)
        setPhase('setup')
        return
      }
      const token = getConsoleToken()
      if (!token) {
        setPhase('login')
        return
      }
      const { admin: me } = await consoleApi.me()
      setAdmin(me)
      setPhase('ready')
    } catch (err) {
      setConsoleToken(null)
      setPhase('login')
      if (err instanceof ApiError && err.status >= 500) {
        setError(err.message)
      }
    }
  }, [])

  useEffect(() => {
    void bootstrap()
  }, [bootstrap])

  async function handleSetup(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const result = await consoleApi.setup(email, password)
      setConsoleToken(result.token)
      setAdmin(result.admin)
      setPassword('')
      setPhase('ready')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Setup failed')
    } finally {
      setBusy(false)
    }
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const result = await consoleApi.login(password)
      if (result.requiresMfa === true) {
        setPendingToken(result.pendingToken)
        setMfaMethod(result.mfaMethod)
        setEmailHint(result.emailHint)
        setPassword('')
        setPhase('mfa')
        return
      }
      setConsoleToken(result.token)
      setAdmin(result.admin)
      setPassword('')
      setPhase('ready')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setBusy(false)
    }
  }

  async function handleMfa(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const result = await consoleApi.verifyMfa(pendingToken, mfaCode)
      setConsoleToken(result.token)
      setAdmin(result.admin)
      setMfaCode('')
      setPendingToken('')
      setPhase('ready')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'MFA failed')
    } finally {
      setBusy(false)
    }
  }

  function logout() {
    setConsoleToken(null)
    setAdmin(null)
    setPhase('login')
    setTab('keys')
  }

  if (phase === 'loading') {
    return (
      <Shell>
        <p className="text-white/50 text-sm">Loading console…</p>
      </Shell>
    )
  }

  if (phase === 'setup') {
    return (
      <Shell title="Create console admin" subtitle="One-time setup for this site and API.">
        <ErrorBanner message={error} />
        <form onSubmit={handleSetup} className="space-y-4">
          <div>
            <label className={labelClass}>Admin email</label>
            <input
              className={inputClass}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@devcon1solutions.com"
              autoComplete="username"
            />
          </div>
          <div>
            <label className={labelClass}>Password (min 10 characters)</label>
            <input
              className={inputClass}
              type="password"
              required
              minLength={10}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <button className={btnPrimary} type="submit" disabled={busy}>
            {busy ? 'Creating…' : 'Create admin account'}
          </button>
        </form>
      </Shell>
    )
  }

  if (phase === 'login') {
    return (
      <Shell title="Console login" subtitle="Enter the admin password to continue.">
        <ErrorBanner message={error} />
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className={labelClass}>Admin password</label>
            <input
              className={inputClass}
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button className={btnPrimary} type="submit" disabled={busy}>
            {busy ? 'Checking…' : 'Continue'}
          </button>
        </form>
      </Shell>
    )
  }

  if (phase === 'mfa') {
    return (
      <Shell
        title="Multi-factor authentication"
        subtitle={
          mfaMethod === 'email'
            ? `Enter the code sent to ${emailHint || 'your email'}.`
            : 'Enter the code from your authenticator app.'
        }
      >
        <ErrorBanner message={error} />
        <form onSubmit={handleMfa} className="space-y-4">
          <div>
            <label className={labelClass}>Verification code</label>
            <input
              className={inputClass}
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              value={mfaCode}
              onChange={(e) => setMfaCode(e.target.value)}
              placeholder="123456"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button className={btnPrimary} type="submit" disabled={busy}>
              {busy ? 'Verifying…' : 'Verify'}
            </button>
            {mfaMethod === 'email' && (
              <button
                type="button"
                className={btnGhost}
                disabled={busy}
                onClick={async () => {
                  setBusy(true)
                  setError('')
                  try {
                    await consoleApi.resendEmailMfa(pendingToken)
                    setInfo('A new code was sent.')
                  } catch (err) {
                    setError(err instanceof Error ? err.message : 'Could not resend')
                  } finally {
                    setBusy(false)
                  }
                }}
              >
                Resend email code
              </button>
            )}
            <button type="button" className={btnGhost} onClick={logout}>
              Back
            </button>
          </div>
          <SuccessBanner message={info} />
        </form>
      </Shell>
    )
  }

  return (
    <div className="min-h-screen bg-[#070712] text-white">
      <header className="border-b border-white/10 bg-[#0b0b1a]/80 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-400/80">Devcon1</p>
            <h1 className="text-lg font-semibold">API Console</h1>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/60">
            <span>{admin?.email}</span>
            <button type="button" className={btnGhost} onClick={logout}>
              Sign out
            </button>
          </div>
        </div>
        <nav className="max-w-6xl mx-auto px-4 pb-3 flex flex-wrap gap-2">
          {(
            [
              ['keys', 'API keys'],
              ['mailer', 'Mailer'],
              ['templates', 'Templates'],
              ['security', 'Security'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                tab === id
                  ? 'bg-white/15 text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {tab === 'keys' && <KeysPanel />}
        {tab === 'mailer' && <MailerPanel />}
        {tab === 'templates' && <TemplatesPanel />}
        {tab === 'security' && admin && (
          <SecurityPanel admin={admin} onAdminChange={setAdmin} />
        )}
      </div>
    </div>
  )
}

function Shell({
  children,
  title = 'Devcon1 Console',
  subtitle,
}: {
  children: ReactNode
  title?: string
  subtitle?: string
}) {
  return (
    <div className="min-h-screen bg-[#070712] text-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-400/80 mb-2">Devcon1</p>
        <h1 className="text-2xl font-semibold mb-1">{title}</h1>
        {subtitle && <p className="text-sm text-white/50 mb-6">{subtitle}</p>}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          {children}
        </div>
      </div>
    </div>
  )
}

function KeysPanel() {
  const [keys, setKeys] = useState<ApiKeyRow[]>([])
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [name, setName] = useState('')
  const [createdSecret, setCreatedSecret] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editDeliverTo, setEditDeliverTo] = useState('')
  const [editBrandName, setEditBrandName] = useState('')
  const [editNotes, setEditNotes] = useState('')

  const load = useCallback(async () => {
    try {
      const data = await consoleApi.listKeys()
      setKeys(data.keys)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load keys')
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  async function createKey(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    setInfo('')
    setCreatedSecret(null)
    try {
      const result = await consoleApi.createKey({ name })
      setCreatedSecret(result.key.secret)
      setName('')
      setInfo('API key created. Copy the secret now — it is only shown once.')
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Create failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">API keys</h2>
        <p className="text-sm text-white/50 mt-1">
          Outside apps present a key to use the contact mailer route.
        </p>
      </div>
      <ErrorBanner message={error} />
      <SuccessBanner message={info} />
      {createdSecret && (
        <div className="rounded-lg border border-amber-400/30 bg-amber-400/10 p-3 text-sm break-all">
          <p className="text-amber-200 font-medium mb-1">New key secret</p>
          <code className="text-amber-50">{createdSecret}</code>
        </div>
      )}
      <form onSubmit={createKey} className="flex flex-wrap gap-2 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className={labelClass}>Key name</label>
          <input
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Marketing site"
            required
          />
        </div>
        <button className={btnPrimary} type="submit" disabled={busy}>
          Add key
        </button>
      </form>
      <div className="space-y-3">
        {keys.map((k) => (
          <div
            key={k.id}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3"
          >
            <div className="flex flex-wrap gap-3 justify-between">
              <div>
                <p className="font-medium">{k.name}</p>
                <p className="text-xs text-white/40 mt-1">
                  {k.prefix}… · {k.active ? 'active' : 'disabled'}
                  {k.deliverTo ? ` · → ${k.deliverTo}` : ''}
                  {k.lastUsedAt
                    ? ` · last used ${new Date(k.lastUsedAt).toLocaleString()}`
                    : ''}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className={btnGhost}
                  onClick={() => {
                    setEditingId(editingId === k.id ? null : k.id)
                    setEditDeliverTo(k.deliverTo || '')
                    setEditBrandName(k.brandName || '')
                    setEditNotes(k.notes || '')
                  }}
                >
                  {editingId === k.id ? 'Close' : 'Edit'}
                </button>
                <button
                  type="button"
                  className={btnGhost}
                  onClick={async () => {
                    await consoleApi.updateKey(k.id, { active: !k.active })
                    await load()
                  }}
                >
                  {k.active ? 'Disable' : 'Enable'}
                </button>
                <button
                  type="button"
                  className={btnDanger}
                  onClick={async () => {
                    if (!confirm(`Delete API key “${k.name}”?`)) return
                    await consoleApi.deleteKey(k.id)
                    await load()
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
            {editingId === k.id && (
              <div className="grid sm:grid-cols-2 gap-3 pt-2 border-t border-white/10">
                <div>
                  <label className={labelClass}>Deliver-to override</label>
                  <input
                    className={inputClass}
                    type="email"
                    value={editDeliverTo}
                    onChange={(e) => setEditDeliverTo(e.target.value)}
                    placeholder="inbox@client.com"
                  />
                </div>
                <div>
                  <label className={labelClass}>Brand name override</label>
                  <input
                    className={inputClass}
                    value={editBrandName}
                    onChange={(e) => setEditBrandName(e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Notes</label>
                  <input
                    className={inputClass}
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className={btnPrimary}
                  onClick={async () => {
                    await consoleApi.updateKey(k.id, {
                      deliverTo: editDeliverTo || null,
                      brandName: editBrandName || null,
                      notes: editNotes,
                    })
                    setEditingId(null)
                    setInfo('API key updated.')
                    await load()
                  }}
                >
                  Save key settings
                </button>
              </div>
            )}
          </div>
        ))}
        {keys.length === 0 && (
          <p className="text-sm text-white/40">No API keys yet.</p>
        )}
      </div>
    </section>
  )
}

function MailerPanel() {
  const [mailer, setMailer] = useState<MailerStatus | null>(null)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [busy, setBusy] = useState(false)
  const [smtpPass, setSmtpPass] = useState('')
  const [resendKey, setResendKey] = useState('')

  const load = useCallback(async () => {
    try {
      const data = await consoleApi.getMailer()
      setMailer(data.mailer)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load mailer')
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  if (!mailer) {
    return <p className="text-white/50 text-sm">Loading mailer settings…</p>
  }

  async function save(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    setInfo('')
    try {
      const body: Record<string, unknown> = {
        activeProvider: mailer.activeProvider,
        defaultDeliverTo: mailer.defaultDeliverTo,
        brandName: mailer.brandName,
        brandUrl: mailer.brandUrl,
        smtp: {
          host: mailer.smtp.host,
          port: mailer.smtp.port,
          secure: mailer.smtp.secure,
          user: mailer.smtp.user,
          ...(smtpPass ? { pass: smtpPass } : {}),
        },
        resend: {
          fromEmail: mailer.resend.fromEmail,
          fromName: mailer.resend.fromName,
          ...(resendKey ? { apiKey: resendKey } : {}),
        },
      }
      const data = await consoleApi.updateMailer(body)
      setMailer(data.mailer)
      setSmtpPass('')
      setResendKey('')
      setInfo('Mailer settings saved.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Mailer</h2>
        <p className="text-sm text-white/50 mt-1">
          Choose SMTP (Nodemailer) or Resend. Credentials are encrypted in MongoDB.
        </p>
      </div>
      <ErrorBanner message={error} />
      <SuccessBanner message={info} />
      <form onSubmit={save} className="space-y-5">
        <div className="flex flex-wrap gap-3">
          {(['smtp', 'resend'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setMailer({ ...mailer, activeProvider: p })}
              className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                mailer.activeProvider === p
                  ? 'border-cyan-400/50 bg-cyan-500/15 text-cyan-100'
                  : 'border-white/10 text-white/50 hover:bg-white/5'
              }`}
            >
              {p === 'smtp' ? 'SMTP / Nodemailer' : 'Resend'}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Default deliver-to</label>
            <input
              className={inputClass}
              type="email"
              value={mailer.defaultDeliverTo}
              onChange={(e) => setMailer({ ...mailer, defaultDeliverTo: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Brand name</label>
            <input
              className={inputClass}
              value={mailer.brandName}
              onChange={(e) => setMailer({ ...mailer, brandName: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Brand URL</label>
            <input
              className={inputClass}
              value={mailer.brandUrl}
              onChange={(e) => setMailer({ ...mailer, brandUrl: e.target.value })}
            />
          </div>
        </div>

        <div className="rounded-xl border border-white/10 p-4 space-y-3">
          <h3 className="text-sm font-semibold text-white/80">SMTP</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Host</label>
              <input
                className={inputClass}
                value={mailer.smtp.host}
                onChange={(e) =>
                  setMailer({ ...mailer, smtp: { ...mailer.smtp, host: e.target.value } })
                }
              />
            </div>
            <div>
              <label className={labelClass}>Port</label>
              <input
                className={inputClass}
                type="number"
                value={mailer.smtp.port}
                onChange={(e) =>
                  setMailer({
                    ...mailer,
                    smtp: { ...mailer.smtp, port: Number(e.target.value) },
                  })
                }
              />
            </div>
            <div>
              <label className={labelClass}>User</label>
              <input
                className={inputClass}
                value={mailer.smtp.user}
                onChange={(e) =>
                  setMailer({ ...mailer, smtp: { ...mailer.smtp, user: e.target.value } })
                }
              />
            </div>
            <div>
              <label className={labelClass}>
                App password {mailer.smtp.hasPassword ? '(set — leave blank to keep)' : ''}
              </label>
              <input
                className={inputClass}
                type="password"
                value={smtpPass}
                onChange={(e) => setSmtpPass(e.target.value)}
                placeholder={mailer.smtp.hasPassword ? '••••••••' : 'Enter SMTP password'}
                autoComplete="new-password"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 p-4 space-y-3">
          <h3 className="text-sm font-semibold text-white/80">Resend</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>From email</label>
              <input
                className={inputClass}
                value={mailer.resend.fromEmail}
                onChange={(e) =>
                  setMailer({
                    ...mailer,
                    resend: { ...mailer.resend, fromEmail: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className={labelClass}>From name</label>
              <input
                className={inputClass}
                value={mailer.resend.fromName}
                onChange={(e) =>
                  setMailer({
                    ...mailer,
                    resend: { ...mailer.resend, fromName: e.target.value },
                  })
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>
                API key {mailer.resend.hasApiKey ? '(set — leave blank to keep)' : ''}
              </label>
              <input
                className={inputClass}
                type="password"
                value={resendKey}
                onChange={(e) => setResendKey(e.target.value)}
                placeholder={mailer.resend.hasApiKey ? '••••••••' : 're_...'}
                autoComplete="new-password"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button className={btnPrimary} type="submit" disabled={busy}>
            {busy ? 'Saving…' : 'Save mailer'}
          </button>
          <button
            type="button"
            className={btnGhost}
            disabled={busy}
            onClick={async () => {
              setBusy(true)
              setError('')
              try {
                const result = await consoleApi.testMailer()
                setInfo(`Test email sent to ${result.to} via ${result.provider}`)
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Test failed')
              } finally {
                setBusy(false)
              }
            }}
          >
            Send test email
          </button>
        </div>
      </form>
    </section>
  )
}

function TemplatesPanel() {
  const [templates, setTemplates] = useState<EmailTemplateRow[]>([])
  const [selected, setSelected] = useState<EmailTemplateRow | null>(null)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    try {
      const data = await consoleApi.listTemplates()
      setTemplates(data.templates)
      if (selected) {
        const refreshed = data.templates.find((t) => t.id === selected.id) || null
        setSelected(refreshed)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load templates')
    }
  }, [selected])

  useEffect(() => {
    void consoleApi.listTemplates().then((data) => setTemplates(data.templates)).catch((err) => {
      setError(err instanceof Error ? err.message : 'Failed to load templates')
    })
  }, [])

  async function save() {
    if (!selected) return
    setBusy(true)
    setError('')
    setInfo('')
    try {
      await consoleApi.updateTemplate(selected.id, {
        name: selected.name,
        subjectTemplate: selected.subjectTemplate,
        htmlTemplate: selected.htmlTemplate,
        textTemplate: selected.textTemplate,
        description: selected.description,
        type: selected.type,
      })
      setInfo('Template saved.')
      const data = await consoleApi.listTemplates()
      setTemplates(data.templates)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setBusy(false)
    }
  }

  async function createCustom() {
    setBusy(true)
    setError('')
    try {
      const created = await consoleApi.createTemplate({
        name: 'Custom template',
        type: 'custom',
        subjectTemplate: 'Message from {{BRAND_NAME}}',
        htmlTemplate: '<p>{{MESSAGE}}</p>',
        textTemplate: '{{MESSAGE}}',
        description: 'Custom contact template',
      })
      const data = await consoleApi.listTemplates()
      setTemplates(data.templates)
      setSelected(data.templates.find((t) => t.id === created.id) || null)
      setInfo('Custom template created.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Create failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">HTML templates</h2>
          <p className="text-sm text-white/50 mt-1">
            Use placeholders like {'{{NAME}}'}, {'{{EMAIL}}'}, {'{{MESSAGE}}'}, {'{{BRAND_NAME}}'}.
          </p>
        </div>
        <button type="button" className={btnPrimary} onClick={() => void createCustom()} disabled={busy}>
          New template
        </button>
      </div>
      <ErrorBanner message={error} />
      <SuccessBanner message={info} />
      <div className="grid lg:grid-cols-[240px_1fr] gap-4">
        <div className="space-y-2">
          {templates.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelected(t)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-colors ${
                selected?.id === t.id
                  ? 'border-cyan-400/40 bg-cyan-500/10'
                  : 'border-white/10 hover:bg-white/5'
              }`}
            >
              <span className="block font-medium">{t.name}</span>
              <span className="text-xs text-white/40">{t.type}</span>
            </button>
          ))}
        </div>
        {selected ? (
          <div className="space-y-3 rounded-xl border border-white/10 p-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Name</label>
                <input
                  className={inputClass}
                  value={selected.name}
                  onChange={(e) => setSelected({ ...selected, name: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass}>Type</label>
                <select
                  className={inputClass}
                  value={selected.type}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      type: e.target.value as EmailTemplateRow['type'],
                    })
                  }
                >
                  <option value="notification">notification</option>
                  <option value="confirmation">confirmation</option>
                  <option value="custom">custom</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Subject template</label>
              <input
                className={inputClass}
                value={selected.subjectTemplate}
                onChange={(e) =>
                  setSelected({ ...selected, subjectTemplate: e.target.value })
                }
              />
            </div>
            <div>
              <label className={labelClass}>HTML template</label>
              <textarea
                className={`${inputClass} font-mono min-h-[220px]`}
                value={selected.htmlTemplate}
                onChange={(e) =>
                  setSelected({ ...selected, htmlTemplate: e.target.value })
                }
              />
            </div>
            <div>
              <label className={labelClass}>Text template</label>
              <textarea
                className={`${inputClass} font-mono min-h-[100px]`}
                value={selected.textTemplate}
                onChange={(e) =>
                  setSelected({ ...selected, textTemplate: e.target.value })
                }
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" className={btnPrimary} disabled={busy} onClick={() => void save()}>
                Save template
              </button>
              {!selected.isSystemDefault && (
                <button
                  type="button"
                  className={btnDanger}
                  onClick={async () => {
                    if (!confirm('Delete this template?')) return
                    await consoleApi.deleteTemplate(selected.id)
                    setSelected(null)
                    await load()
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-white/40">Select a template to edit.</p>
        )}
      </div>
    </section>
  )
}

function SecurityPanel({
  admin,
  onAdminChange,
}: {
  admin: AdminPublic
  onAdminChange: (a: AdminPublic) => void
}) {
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [busy, setBusy] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [totpQr, setTotpQr] = useState<string | null>(null)
  const [totpSecret, setTotpSecret] = useState('')
  const [totpCode, setTotpCode] = useState('')
  const [disablePassword, setDisablePassword] = useState('')

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Security</h2>
        <p className="text-sm text-white/50 mt-1">
          Single console admin. MFA via authenticator (TOTP) or email OTP.
        </p>
      </div>
      <ErrorBanner message={error} />
      <SuccessBanner message={info} />

      <div className="rounded-xl border border-white/10 p-4 space-y-3">
        <h3 className="font-medium">Password</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Current password</label>
            <input
              className={inputClass}
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>New password</label>
            <input
              className={inputClass}
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          type="button"
          className={btnPrimary}
          disabled={busy}
          onClick={async () => {
            setBusy(true)
            setError('')
            try {
              await consoleApi.changePassword(currentPassword, newPassword)
              setCurrentPassword('')
              setNewPassword('')
              setInfo('Password updated.')
            } catch (err) {
              setError(err instanceof Error ? err.message : 'Password change failed')
            } finally {
              setBusy(false)
            }
          }}
        >
          Update password
        </button>
      </div>

      <div className="rounded-xl border border-white/10 p-4 space-y-3">
        <h3 className="font-medium">MFA status</h3>
        <p className="text-sm text-white/60">
          {admin.mfaEnabled
            ? `Enabled (${admin.mfaMethod})`
            : 'Disabled — enable TOTP or email MFA below.'}
        </p>

        {!admin.mfaEnabled && (
          <>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={btnGhost}
                disabled={busy}
                onClick={async () => {
                  setBusy(true)
                  setError('')
                  try {
                    const result = await consoleApi.totpSetup()
                    setTotpQr(result.qrDataUrl)
                    setTotpSecret(result.secret)
                  } catch (err) {
                    setError(err instanceof Error ? err.message : 'TOTP setup failed')
                  } finally {
                    setBusy(false)
                  }
                }}
              >
                Set up authenticator (TOTP)
              </button>
              <button
                type="button"
                className={btnGhost}
                disabled={busy}
                onClick={async () => {
                  setBusy(true)
                  setError('')
                  try {
                    const result = await consoleApi.emailMfaEnable()
                    onAdminChange({
                      ...admin,
                      mfaEnabled: result.mfaEnabled,
                      mfaMethod: result.mfaMethod,
                    })
                    setInfo('Email MFA enabled. Codes will be sent to your admin email on login.')
                  } catch (err) {
                    setError(err instanceof Error ? err.message : 'Email MFA failed')
                  } finally {
                    setBusy(false)
                  }
                }}
              >
                Enable email MFA
              </button>
            </div>
            {totpQr && (
              <div className="space-y-3 pt-2">
                <img src={totpQr} alt="TOTP QR code" className="w-40 h-40 rounded-lg bg-white p-2" />
                <p className="text-xs text-white/40 break-all">Secret: {totpSecret}</p>
                <div>
                  <label className={labelClass}>Confirm with a code</label>
                  <input
                    className={inputClass}
                    value={totpCode}
                    onChange={(e) => setTotpCode(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className={btnPrimary}
                  disabled={busy}
                  onClick={async () => {
                    setBusy(true)
                    setError('')
                    try {
                      const result = await consoleApi.totpEnable(totpCode)
                      onAdminChange({
                        ...admin,
                        mfaEnabled: result.mfaEnabled,
                        mfaMethod: result.mfaMethod,
                      })
                      setTotpQr(null)
                      setTotpCode('')
                      setInfo('TOTP MFA enabled.')
                    } catch (err) {
                      setError(err instanceof Error ? err.message : 'Could not enable TOTP')
                    } finally {
                      setBusy(false)
                    }
                  }}
                >
                  Enable TOTP
                </button>
              </div>
            )}
          </>
        )}

        {admin.mfaEnabled && (
          <div className="space-y-3 pt-2">
            <div>
              <label className={labelClass}>Password to disable MFA</label>
              <input
                className={inputClass}
                type="password"
                value={disablePassword}
                onChange={(e) => setDisablePassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className={btnDanger}
              disabled={busy}
              onClick={async () => {
                setBusy(true)
                setError('')
                try {
                  const result = await consoleApi.disableMfa(disablePassword)
                  onAdminChange({
                    ...admin,
                    mfaEnabled: result.mfaEnabled,
                    mfaMethod: result.mfaMethod,
                  })
                  setDisablePassword('')
                  setInfo('MFA disabled.')
                } catch (err) {
                  setError(err instanceof Error ? err.message : 'Could not disable MFA')
                } finally {
                  setBusy(false)
                }
              }}
            >
              Disable MFA
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
