import { atom } from 'nanostores';

export type LLMProvider = 'anthropic' | 'groq';

export interface ProviderConfig {
  provider: LLMProvider;
  apiKey: string;
}

const STORAGE_KEY = 'x-builder-provider';

function loadFromStorage(): ProviderConfig {
  if (typeof localStorage === 'undefined') {
    return { provider: 'anthropic', apiKey: '' };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { provider: 'anthropic', apiKey: '' };
}

export const providerStore = atom<ProviderConfig>(loadFromStorage());

export function setProvider(config: ProviderConfig) {
  providerStore.set(config);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }
}

export const PROVIDER_LABELS: Record<LLMProvider, string> = {
  anthropic: 'Anthropic (Claude)',
  groq: 'Groq (Llama)',
};

export const PROVIDER_MODELS: Record<LLMProvider, string> = {
  anthropic: 'claude-3-5-sonnet-20240620',
  groq: 'llama-3.3-70b-versatile',
};
