import config from "../config.json"

export function isProd() {
  return process.env.NODE_ENV !== "development"
}

export function server() {
  return isProd() ? config?.api : config?.dev
}
