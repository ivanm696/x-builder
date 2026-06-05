import { env } from 'node:process';

export type LLMProvider = 'anthropic' | 'groq';

export function getAPIKey(cloudflareEnv: Env, provider: LLMProvider = 'anthropic'): string {
  if (provider === 'groq') {
    return env.GROQ_API_KEY || (cloudflareEnv as any).GROQ_API_KEY || '';
  }
  return env.ANTHROPIC_API_KEY || cloudflareEnv.ANTHROPIC_API_KEY || '';
}

export function getProvider(request: Request): LLMProvider {
  const provider = request.headers.get('x-llm-provider');
  if (provider === 'groq') return 'groq';
  return 'anthropic';
}
