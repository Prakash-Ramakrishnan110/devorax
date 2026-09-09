import { describe, it, expect } from 'vitest';
import { parseAIJSON, createPrompt, normalizeTokenUsage } from '../../src/ai/index.js';

describe('AI Module', () => {
  describe('parseAIJSON', () => {
    it('parses raw JSON correctly', () => {
      const data = parseAIJSON('{"key": "value"}');
      expect(data).toEqual({ key: 'value' });
    });

    it('parses JSON wrapped in generic markdown code blocks', () => {
      const data = parseAIJSON('```\n{"key": "value"}\n```');
      expect(data).toEqual({ key: 'value' });
    });

    it('parses JSON wrapped in specific json markdown code blocks', () => {
      const data = parseAIJSON('Here is your response:\n```json\n{"key": "value"}\n```');
      expect(data).toEqual({ key: 'value' });
    });

    it('throws error for invalid JSON', () => {
      expect(() => parseAIJSON('not json')).toThrow(/Failed to parse AI JSON response/);
    });
  });

  describe('createPrompt', () => {
    it('replaces single variables', () => {
      const prompt = createPrompt('Hello {{name}}', { name: 'Alice' });
      expect(prompt).toBe('Hello Alice');
    });

    it('replaces multiple occurrences of the same variable', () => {
      const prompt = createPrompt('{{a}} + {{a}} = 2', { a: 1 });
      expect(prompt).toBe('1 + 1 = 2');
    });

    it('replaces different variables', () => {
      const prompt = createPrompt('{{a}} and {{b}}', { a: 'cats', b: 'dogs' });
      expect(prompt).toBe('cats and dogs');
    });
    
    it('leaves unmatched placeholders alone', () => {
      const prompt = createPrompt('{{a}} and {{b}}', { a: 'cats' });
      expect(prompt).toBe('cats and {{b}}');
    });
  });

  describe('normalizeTokenUsage', () => {
    it('normalizes OpenAI format', () => {
      const usage = normalizeTokenUsage({
        prompt_tokens: 10,
        completion_tokens: 20,
        total_tokens: 30,
      });
      expect(usage).toEqual({ promptTokens: 10, completionTokens: 20, totalTokens: 30 });
    });

    it('normalizes Anthropic format', () => {
      const usage = normalizeTokenUsage({
        input_tokens: 15,
        output_tokens: 25,
      });
      expect(usage).toEqual({ promptTokens: 15, completionTokens: 25, totalTokens: 40 });
    });

    it('normalizes Gemini format', () => {
      const usage = normalizeTokenUsage({
        promptTokenCount: 5,
        candidatesTokenCount: 10,
        totalTokenCount: 15,
      });
      expect(usage).toEqual({ promptTokens: 5, completionTokens: 10, totalTokens: 15 });
    });

    it('handles missing or invalid input gracefully', () => {
      expect(normalizeTokenUsage(null)).toEqual({ promptTokens: 0, completionTokens: 0, totalTokens: 0 });
      expect(normalizeTokenUsage(undefined)).toEqual({ promptTokens: 0, completionTokens: 0, totalTokens: 0 });
      expect(normalizeTokenUsage('string')).toEqual({ promptTokens: 0, completionTokens: 0, totalTokens: 0 });
      expect(normalizeTokenUsage({})).toEqual({ promptTokens: 0, completionTokens: 0, totalTokens: 0 });
    });
  });
});
