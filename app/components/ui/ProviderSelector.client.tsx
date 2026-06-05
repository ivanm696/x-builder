import { useStore } from '@nanostores/react';
import { useState } from 'react';
import { providerStore, setProvider, PROVIDER_LABELS, PROVIDER_MODELS, type LLMProvider } from '~/lib/stores/provider';

export function ProviderSelector() {
  const config = useStore(providerStore);
  const [open, setOpen] = useState(false);
  const [inputKey, setInputKey] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaving(true);
    setProvider({ provider: config.provider, apiKey: inputKey || config.apiKey });
    setTimeout(() => { setSaving(false); setSaved(true); setOpen(false); setTimeout(() => setSaved(false), 2000); }, 300);
  }

  function handleProviderChange(p: LLMProvider) {
    setProvider({ provider: p, apiKey: config.apiKey });
    setInputKey('');
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
          bg-bolt-elements-button-secondary-background text-bolt-elements-button-secondary-text
          hover:bg-bolt-elements-button-secondary-backgroundHover border border-bolt-elements-borderColor
          transition-colors"
        title="Select AI Provider"
      >
        <div className={config.provider === 'groq' ? 'i-ph:lightning-fill text-yellow-400' : 'i-ph:robot-fill text-blue-400'} />
        <span>{config.provider === 'groq' ? 'Groq' : 'Claude'}</span>
        <div className="i-ph:caret-down text-xs opacity-60" />
        {config.apiKey && <div className="w-1.5 h-1.5 rounded-full bg-green-400" title="API key set" />}
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-80 rounded-lg shadow-xl
          bg-bolt-elements-background-depth-2 border border-bolt-elements-borderColor p-4">

          <div className="text-sm font-semibold text-bolt-elements-textPrimary mb-3 flex items-center gap-2">
            <div className="i-ph:plugs-connected" />
            AI Provider Settings
          </div>

          {/* Provider selector */}
          <div className="mb-3">
            <label className="text-xs text-bolt-elements-textSecondary mb-1.5 block">Provider</label>
            <div className="flex gap-2">
              {(['anthropic', 'groq'] as LLMProvider[]).map((p) => (
                <button
                  key={p}
                  onClick={() => handleProviderChange(p)}
                  className={`flex-1 py-2 px-3 rounded-md text-xs font-medium border transition-colors
                    ${config.provider === p
                      ? 'bg-accent-500 text-white border-accent-500'
                      : 'bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary border-bolt-elements-borderColor hover:border-accent-500'
                    }`}
                >
                  {p === 'groq' ? '⚡ Groq' : '🤖 Claude'}
                </button>
              ))}
            </div>
          </div>

          {/* Model info */}
          <div className="mb-3 p-2 rounded bg-bolt-elements-background-depth-3 text-xs text-bolt-elements-textSecondary">
            Model: <span className="text-bolt-elements-textPrimary font-mono">{PROVIDER_MODELS[config.provider]}</span>
          </div>

          {/* API Key input */}
          <div className="mb-3">
            <label className="text-xs text-bolt-elements-textSecondary mb-1.5 block">
              {config.provider === 'groq' ? 'Groq API Key (gsk_...)' : 'Anthropic API Key (sk-ant-...)'}
            </label>
            <input
              type="password"
              placeholder={config.apiKey ? '••••••••••••••••' : 'Paste your API key here'}
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="w-full px-3 py-2 rounded-md text-xs font-mono
                bg-bolt-elements-background-depth-3 text-bolt-elements-textPrimary
                border border-bolt-elements-borderColor focus:border-accent-500
                outline-none transition-colors"
            />
            <p className="mt-1 text-xs text-bolt-elements-textTertiary">
              {config.provider === 'groq'
                ? 'Get free key at console.groq.com'
                : 'Get key at console.anthropic.com'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving || (!inputKey && !config.apiKey)}
              className="flex-1 py-2 rounded-md text-sm font-medium bg-accent-500 text-white
                hover:bg-accent-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save'}
            </button>
            <button
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-md text-sm text-bolt-elements-textSecondary
                hover:bg-bolt-elements-background-depth-3 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
