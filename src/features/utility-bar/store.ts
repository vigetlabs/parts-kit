
import { create } from "zustand";
import { devtools } from "zustand/middleware";


interface UtilityState {
  isSettingsVisible: boolean;
  setIsSettingsVisible: (newVal: boolean) => void;
}

export const useUtilityBarStore = create<UtilityState>()(
  devtools(
    (set) => ({
      isSettingsVisible: false,
      setIsSettingsVisible: (newVal: boolean) => set(() => ({ isSettingsVisible: newVal })),
    })
  )
)
