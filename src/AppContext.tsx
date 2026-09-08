import { createContext } from "react"

export type MenuOption = {
  label: string
  path: string
  name?: string
}

export type AppContextValue = {
  menuOptions: MenuOption[]
  appFullscreen: boolean
  setAppFullscreen?: (v: boolean) => void
  [key: string]: unknown
}

const AppContext = createContext<AppContextValue>({
  menuOptions: [],
  appFullscreen: false,
})

export default AppContext
