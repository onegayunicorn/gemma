export interface ModelCapabilities {
  streaming: boolean;
  vision: boolean;
  tools: boolean;
  maxOutputTokens: number;
}

export interface ModelDefinition extends ModelCapabilities {
  id: string;
  name: string;
  shortName: string;
  description: string;
  contextTokens: number;
  defaultMaxOutput: number;
}
