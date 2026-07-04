import config from "../config.json"

// Flip to true ONLY when you are running the DevCon1 API locally
// (config.dev) on your machine. Otherwise the public production API is used
// everywhere — including localhost — so the contact form works during
// frontend development without a local backend.
const USE_LOCAL_API = false

export function isProd() {
  if (typeof window === "undefined") return true
  const host = window.location.hostname
  const isLocal =
    host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0"
  return !(isLocal && USE_LOCAL_API)
}

export function server() {
  return isProd() ? config?.api : config?.dev
}
