import { create } from "zustand";

interface UiState {
  sidebarOpen: boolean;
  settingsOpen: boolean;
  searchOpen: boolean;
  shortcutsOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setSettingsOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setShortcutsOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: false,
  settingsOpen: false,
  searchOpen: false,
  shortcutsOpen: false,
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
  setSearchOpen: (searchOpen) => set({ searchOpen }),
  setShortcutsOpen: (shortcutsOpen) => set({ shortcutsOpen }),
}));
