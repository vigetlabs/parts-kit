import { create } from "zustand";
/**
 * persist lets us store data in localstorage
 * https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md
 */
import { devtools, persist } from "zustand/middleware";

interface SettingsState {
  navUrl: string;
  setNavUrl: (url: string) => void;
}

export const DEFAULT_NAV_URL = `${import.meta.env.BASE_URL}nav.json`

export const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      (set) => ({
        navUrl: DEFAULT_NAV_URL,
        setNavUrl: (newNavUrl) => set(() => ({ navUrl: newNavUrl })),
      }),
      {
        name: "settings",
      },
    ),
  ),
);
