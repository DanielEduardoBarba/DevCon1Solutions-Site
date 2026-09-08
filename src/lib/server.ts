import config from "../config.json"

/** Flip true only when running the API locally (`npm run server` in functions/). */
const USE_LOCAL_API = false

export function isProd(): boolean {
  if (typeof window === "undefined") return true
  const host = window.location.hostname
  const isLocal =
    host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0"
  return !(isLocal && USE_LOCAL_API)
}

export function server(): string {
  return isProd() ? config.api : config.dev
}
