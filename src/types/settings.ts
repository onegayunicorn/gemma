export type ThemePreference = "dark" | "oled" | "light" | "system";

export interface GenerationSettings {
  temperature: number;
  topP: number;
  maxOutputTokens: number;
  systemInstruction: string;
}

export interface AppSettings {
  theme: ThemePreference;
  enterToSend: boolean;
  showTimestamps: boolean;
  compactMessages: boolean;
  saveConversations: boolean;
  generation: GenerationSettings;
}
