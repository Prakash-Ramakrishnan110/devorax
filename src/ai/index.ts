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

/**
 * Parses and extracts function calling arguments from an AI response.
 * Useful when working with OpenAI or Anthropic tool calls.
 * 
 * @param toolCallArgs - Raw string or object arguments from the AI
 * @returns Parsed object of type T
 */
export function parseFunctionArgs<T = unknown>(toolCallArgs: string | object): T {
  if (typeof toolCallArgs === 'object' && toolCallArgs !== null) {
    return toolCallArgs as T;
  }
  
  if (typeof toolCallArgs === 'string') {
    try {
      return JSON.parse(toolCallArgs) as T;
    } catch (e) {
      throw new Error('Failed to parse function arguments JSON: ' + (e as Error).message);
    }
  }
  
  throw new Error('Invalid function arguments type. Expected string or object.');
}

/**
 * Roughly estimates token count for a given text based on standard heuristics.
 * (1 token ~= 4 English chars). This is not an exact calculation for specific tokenizers.
 *
 * @param text - The text to estimate
 * @returns Approximate number of tokens
 */
export function estimateTokens(text: string): number {
  if (!text) return 0;
  // Standard heuristic: 1 token is approx 4 characters in English
  return Math.ceil(text.length / 4);
}

/**
 * A helper to consume an async iterable stream and accumulate the chunks into a full string.
 * This is useful for streaming AI responses where you need the final text.
 *
 * @param stream - An async iterable stream of strings
 * @returns A promise that resolves to the complete concatenated string
 */
export async function consumeStream(stream: AsyncIterable<string>): Promise<string> {
  let fullText = '';
  for await (const chunk of stream) {
    fullText += chunk;
  }
  return fullText;
}
