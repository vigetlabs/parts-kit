import { create } from 'zustand'
import { devtools, persist, combine } from 'zustand/middleware'

export type ThemeMode = 'light' | 'dark'

export enum ScreenSize {
  Mobile,
  Tablet,
  Desktop,
  Manual,
}

export const screenSizes = [
  {
    title: 'Mobile',
    size: ScreenSize.Mobile,
  },
  {
    title: 'Tablet',
    size: ScreenSize.Tablet,
  },
  {
    title: 'Desktop',
    size: ScreenSize.Desktop,
  },
  {
    title: 'Manual',
    size: ScreenSize.Manual,
  },
]

export const screenSizeMap = {
  [ScreenSize.Mobile]: 375,
  [ScreenSize.Tablet]: 768,
  [ScreenSize.Desktop]: undefined,
  [ScreenSize.Manual]: undefined,
}

const getInitialMode = (): ThemeMode => {
  const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)')
  return colorSchemeQuery.matches ? 'dark' : 'light'
}

export const useThemeStore = create(
  persist(
    devtools(
      combine({ mode: getInitialMode() }, (set) => ({
        setMode: (mode: ThemeMode) => set(() => ({ mode })),
        toggleMode: () =>
          set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
      })),
    ),
    {
      name: 'theme-store',
    },
  ),
)

export const useUtilityBarStore = create(
  devtools(
    combine(
      {
        isSettingsVisible: false,
        isSettingsOpen: false,
        isViewportOpen: false,
        isNavBarVisible: true,
        activeScreenSize: ScreenSize.Desktop,
        manualWidth: 800,
      },
      (set) => ({
        setIsSettingsVisible: (newVal: boolean) =>
          set(() => ({ isSettingsVisible: newVal })),

        setIsSettingsOpen: (open: boolean) =>
          set(() => ({ isSettingsOpen: open })),

        setIsViewportOpen: (open: boolean) =>
          set(() => ({ isViewportOpen: open })),

        setIsNavBarVisible: (visible: boolean) =>
          set(() => ({ isNavBarVisible: visible })),

        setActiveScreenSize: (val: ScreenSize) =>
          set(() => ({ activeScreenSize: val })),

        setManualWidth: (val: number) => set(() => ({ manualWidth: val })),
      }),
    ),
  ),
)
