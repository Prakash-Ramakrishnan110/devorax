/**
 * Safely parses a JSON string potentially wrapped in markdown code blocks,
 * which is a common occurrence in LLM responses.
 *
 * @param response - The raw string response from an AI model
 * @returns The parsed JSON object
 * @throws Error if the string cannot be parsed as JSON
 *
 * @example
 * const data = parseAIJSON('```json\n{"key": "value"}\n```');
 */
export function parseAIJSON<T = unknown>(response: string): T {
  const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, response];
  const cleaned = jsonMatch[1]!.trim();
  try {
    return JSON.parse(cleaned) as T;
  } catch (e) {
    throw new Error('Failed to parse AI JSON response: ' + (e as Error).message);
  }
}

/**
 * Creates a prompt by substituting variables into a template string.
 * Variables should be formatted as {{variableName}} in the template.
 *
 * @param template - The template string
 * @param variables - An object containing the variables to inject
 * @returns The populated prompt string
 *
 * @example
 * createPrompt("Hello {{name}}", { name: "Alice" }) // "Hello Alice"
 */
export function createPrompt(
  template: string,
  variables: Record<string, string | number>,
): string {
  let prompt = template;
  for (const [key, value] of Object.entries(variables)) {
    prompt = prompt.split(`{{${key}}}`).join(String(value));
  }
  return prompt;
}

/**
 * Standardized token usage interface for DevoraX
 */
export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

/**
 * Normalizes token usage reporting from various AI provider formats (OpenAI, Anthropic, Gemini)
 * into a single standard format.
 *
 * @param input - The usage object returned by the AI provider
 * @returns Normalized token usage object
 *
 * @example
 * // OpenAI style
 * normalizeTokenUsage({ prompt_tokens: 10, completion_tokens: 20 })
 * // Anthropic style
 * normalizeTokenUsage({ input_tokens: 10, output_tokens: 20 })
 * // Gemini style
 * normalizeTokenUsage({ promptTokenCount: 10, candidatesTokenCount: 20 })
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalizeTokenUsage(input: any): TokenUsage {
  if (!input || typeof input !== 'object') {
    return { promptTokens: 0, completionTokens: 0, totalTokens: 0 };
  }

  const promptTokens =
    input.prompt_tokens ?? input.input_tokens ?? input.promptTokenCount ?? 0;
  const completionTokens =
    input.completion_tokens ?? input.output_tokens ?? input.candidatesTokenCount ?? 0;
  const totalTokens =
    input.total_tokens ?? input.totalTokenCount ?? promptTokens + completionTokens;

  return { promptTokens, completionTokens, totalTokens };
}
