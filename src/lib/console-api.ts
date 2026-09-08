import { server } from "./server"

const TOKEN_KEY = "devcon1_console_token"

export function getConsoleToken(): string | null {
  if (typeof window === "undefined") return null
  return sessionStorage.getItem(TOKEN_KEY)
}

export function setConsoleToken(token: string | null): void {
  if (typeof window === "undefined") return
  if (token) sessionStorage.setItem(TOKEN_KEY, token)
  else sessionStorage.removeItem(TOKEN_KEY)
}

export class ApiError extends Error {
  status: number
  details?: unknown
  constructor(message: string, status: number, details?: unknown) {
    super(message)
    this.status = status
    this.details = details
  }
}

async function request<T>(
  path: string,
  options: RequestInit & { auth?: boolean } = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  }
  if (options.auth !== false) {
    const token = getConsoleToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${server()}${path}`, {
    ...options,
    headers,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new ApiError(
      (data as { error?: string }).error || res.statusText || "Request failed",
      res.status,
      data
    )
  }
  return data as T
}

export type AdminPublic = {
  email: string
  mfaEnabled: boolean
  mfaMethod: "totp" | "email" | null
}

export type ApiKeyRow = {
  id: string
  name: string
  prefix: string
  active: boolean
  deliverTo: string | null
  brandName: string | null
  brandUrl: string | null
  sendNotification: boolean
  sendConfirmation: boolean
  allowOverrides: boolean
  notificationTemplateId: string | null
  confirmationTemplateId: string | null
  notes: string
  lastUsedAt: string | null
  createdAt: string
  updatedAt: string
}

export type MailerStatus = {
  activeProvider: "smtp" | "resend"
  defaultDeliverTo: string
  brandName: string
  brandUrl: string
  smtp: {
    host: string
    port: number
    secure: boolean
    user: string
    hasPassword: boolean
  }
  resend: {
    fromEmail: string
    fromName: string
    hasApiKey: boolean
  }
}

export type EmailTemplateRow = {
  id: string
  name: string
  slug: string
  type: "notification" | "confirmation" | "custom"
  subjectTemplate: string
  htmlTemplate: string
  textTemplate: string
  description: string
  isSystemDefault: boolean
  createdAt: string
  updatedAt: string
}

export const consoleApi = {
  status: () =>
    request<{ setupRequired: boolean }>("/admin/auth/status", { auth: false }),

  setup: (email: string, password: string) =>
    request<{ token: string; admin: AdminPublic }>("/admin/auth/setup", {
      method: "POST",
      auth: false,
      body: JSON.stringify({ email, password }),
    }),

  login: (password: string) =>
    request<
      | {
          requiresMfa: false
          token: string
          admin: AdminPublic
        }
      | {
          requiresMfa: true
          mfaMethod: "totp" | "email"
          pendingToken: string
          emailHint: string
        }
    >("/admin/auth/login", {
      method: "POST",
      auth: false,
      body: JSON.stringify({ password }),
    }),

  verifyMfa: (pendingToken: string, code: string) =>
    request<{ token: string; admin: AdminPublic }>("/admin/auth/mfa/verify", {
      method: "POST",
      auth: false,
      body: JSON.stringify({ pendingToken, code }),
    }),

  resendEmailMfa: (pendingToken: string) =>
    request<{ ok: boolean }>("/admin/auth/mfa/email/resend", {
      method: "POST",
      auth: false,
      body: JSON.stringify({ pendingToken }),
    }),

  me: () => request<{ admin: AdminPublic }>("/admin/auth/me"),

  changePassword: (currentPassword: string, newPassword: string) =>
    request<{ ok: boolean }>("/admin/auth/password", {
      method: "POST",
      body: JSON.stringify({ currentPassword, newPassword }),
    }),

  updateEmail: (email: string) =>
    request<{ email: string }>("/admin/auth/email", {
      method: "PATCH",
      body: JSON.stringify({ email }),
    }),

  totpSetup: () =>
    request<{ secret: string; otpauth: string; qrDataUrl: string }>(
      "/admin/auth/mfa/totp/setup",
      { method: "POST" }
    ),

  totpEnable: (code: string) =>
    request<{ mfaEnabled: boolean; mfaMethod: "totp" }>(
      "/admin/auth/mfa/totp/enable",
      { method: "POST", body: JSON.stringify({ code }) }
    ),

  emailMfaEnable: () =>
    request<{ mfaEnabled: boolean; mfaMethod: "email" }>(
      "/admin/auth/mfa/email/enable",
      { method: "POST" }
    ),

  disableMfa: (password: string) =>
    request<{ mfaEnabled: boolean; mfaMethod: null }>("/admin/auth/mfa/disable", {
      method: "POST",
      body: JSON.stringify({ password }),
    }),

  listKeys: () => request<{ keys: ApiKeyRow[] }>("/admin/keys"),

  createKey: (body: Partial<ApiKeyRow> & { name: string }) =>
    request<{
      key: { id: string; name: string; prefix: string; secret: string; active: boolean }
    }>("/admin/keys", { method: "POST", body: JSON.stringify(body) }),

  updateKey: (id: string, body: Partial<ApiKeyRow>) =>
    request<{ ok: boolean }>(`/admin/keys/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  deleteKey: (id: string) =>
    request<{ ok: boolean }>(`/admin/keys/${id}`, { method: "DELETE" }),

  getMailer: () => request<{ mailer: MailerStatus }>("/admin/mailer"),

  updateMailer: (body: Record<string, unknown>) =>
    request<{ mailer: MailerStatus }>("/admin/mailer", {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  testMailer: (to?: string) =>
    request<{ ok: boolean; to: string; provider: string }>("/admin/mailer/test", {
      method: "POST",
      body: JSON.stringify({ to }),
    }),

  listTemplates: () =>
    request<{ templates: EmailTemplateRow[] }>("/admin/templates"),

  createTemplate: (body: Partial<EmailTemplateRow> & {
    name: string
    type: EmailTemplateRow["type"]
    subjectTemplate: string
    htmlTemplate: string
  }) =>
    request<{ id: string; slug: string }>("/admin/templates", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateTemplate: (id: string, body: Partial<EmailTemplateRow>) =>
    request<{ ok: boolean }>(`/admin/templates/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  deleteTemplate: (id: string) =>
    request<{ ok: boolean }>(`/admin/templates/${id}`, { method: "DELETE" }),
}
