import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_SYSTEM_INSTRUCTION } from "@/lib/models";
import { clampMaxTokens, clampTemperature, clampTopP } from "@/lib/validation";
import type { AppSettings, ThemePreference } from "@/types/settings";

const defaults: AppSettings = {
  theme: "dark",
  enterToSend: true,
  showTimestamps: true,
  compactMessages: false,
  saveConversations: true,
  generation: {
    temperature: 0.7,
    topP: 1,
    maxOutputTokens: 1024,
    systemInstruction: DEFAULT_SYSTEM_INSTRUCTION,
  },
};

interface SettingsState extends AppSettings {
  hydrated: boolean;
  setTheme: (theme: ThemePreference) => void;
  setEnterToSend: (value: boolean) => void;
  setShowTimestamps: (value: boolean) => void;
  setCompactMessages: (value: boolean) => void;
  setSaveConversations: (value: boolean) => void;
  setTemperature: (value: number) => void;
  setTopP: (value: number) => void;
  setMaxOutputTokens: (value: number) => void;
  setSystemInstruction: (value: string) => void;
  resetGeneration: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaults,
      hydrated: false,
      setTheme: (theme) => set({ theme }),
      setEnterToSend: (enterToSend) => set({ enterToSend }),
      setShowTimestamps: (showTimestamps) => set({ showTimestamps }),
      setCompactMessages: (compactMessages) => set({ compactMessages }),
      setSaveConversations: (saveConversations) => set({ saveConversations }),
      setTemperature: (value) =>
        set((s) => ({ generation: { ...s.generation, temperature: clampTemperature(value) } })),
      setTopP: (value) => set((s) => ({ generation: { ...s.generation, topP: clampTopP(value) } })),
      setMaxOutputTokens: (value) =>
        set((s) => ({ generation: { ...s.generation, maxOutputTokens: clampMaxTokens(value) } })),
      setSystemInstruction: (systemInstruction) =>
        set((s) => ({ generation: { ...s.generation, systemInstruction } })),
      resetGeneration: () => set({ generation: defaults.generation }),
    }),
    {
      name: "gemma-settings",
      partialize: (s) => ({
        theme: s.theme,
        enterToSend: s.enterToSend,
        showTimestamps: s.showTimestamps,
        compactMessages: s.compactMessages,
        saveConversations: s.saveConversations,
        generation: s.generation,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    },
  ),
);
