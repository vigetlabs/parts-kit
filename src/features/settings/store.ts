import { create } from 'zustand'
/**
 * persist lets us store data in localstorage
 * https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md
 */
import { devtools, persist } from 'zustand/middleware'

interface SettingsState {
  configUrl: string
  setConfigUrl: (url: string) => void
}

export const DEFAULT_NAV_URL = `${import.meta.env.BASE_URL}config.json`

export const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      (set) => ({
        configUrl: DEFAULT_NAV_URL,
        setConfigUrl: (newNavUrl) => set(() => ({ configUrl: newNavUrl })),
      }),
      {
        name: 'settings',
      },
    ),
  ),
)
