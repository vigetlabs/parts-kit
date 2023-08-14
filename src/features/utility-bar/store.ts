
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UtilityState {
  isSettingsVisible: boolean;
  setIsSettingsVisible: (newVal: boolean) => void;
  activeScreenSize: ScreenSize;
  setActiveScreenSize: (newVal: ScreenSize) => void;
}
export enum ScreenSize {
  Mobile,
  Tablet,
  Desktop,
}

export const screenSizes = [
  {
    title: "Mobile",
    size: ScreenSize.Mobile,
  },
  {
    title: "Tablet",
    size: ScreenSize.Tablet,
  },
  {
    title: "Desktop",
    size: ScreenSize.Desktop,
  },
];

export const screenSizeMap = {
  [ScreenSize.Mobile]: 375,
  [ScreenSize.Tablet]: 768,
  [ScreenSize.Desktop]: undefined,
};

export const useUtilityBarStore = create<UtilityState>()(
  devtools(
    (set) => ({
      isSettingsVisible: false,
      setIsSettingsVisible: (newVal: boolean) => set(() => ({ isSettingsVisible: newVal })),
      activeScreenSize: ScreenSize.Desktop,
      setActiveScreenSize: (val: ScreenSize) => set(() => ({ activeScreenSize: val }))
    })
  )
)
