import config from "./config.json"

export function isProd() {
    return import.meta.env.VITE_ENV != "development"

}

export function server() {
    return isProd() ? config?.api : config?.dev
}

console.log("ENV:",isProd()?"PRODUCTION":"DEVELOPMENT")
console.log("REACT_ENV: ", import.meta.env.VITE_ENV)