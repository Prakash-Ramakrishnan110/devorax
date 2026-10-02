import { describe, it, expect } from 'vitest';
import { encryptAES, decryptAES } from '../src/security/index.js';
import { validateSchema } from '../src/validation/index.js';
import { poll, batchPromises } from '../src/async/index.js';
import { estimateTokens } from '../src/ai/index.js';

describe('DevoraX Complex Real-World Integration', () => {
  it('should securely process and validate a batch of user profiles', async () => {
    // 1. We have a batch of incoming unverified data
    const rawUsers = [
      { id: 1, name: 'Alice', secret: 'password123', email: 'alice@example.com' },
      { id: 2, name: 'Bob', secret: 'my-super-secret', email: 'bob@example.com' },
      { id: 3, name: 'Charlie', secret: 'hunter2', email: 'charlie@example.com' },
    ];

    const encryptionKey = '12345678901234567890123456789012'; // 32 byte key

    // 2. Process all users using `batchPromises` to avoid memory/network overload
    const processedUsers = await batchPromises(
      rawUsers,
      async (user: any) => {
        // Validate user using our new Schema Validator
        const validation = validateSchema(user, {
          name: (v: any) => typeof v === 'string' && v.length > 0,
          secret: (v: any) => typeof v === 'string',
        });
        
        expect(validation.valid).toBe(true);

        // Encrypt their secret using AES-GCM
        const encryptedSecret = await encryptAES(user.secret, encryptionKey);

        return { ...user, secret: encryptedSecret, verified: true };
      },
      2 // Batch size of 2
    );

    // 3. Verify they were processed and encrypted
    expect(processedUsers).toHaveLength(3);
    expect(processedUsers[0].secret).not.toBe('password123'); // Should be encrypted gibberish
    
    // Decrypt the first user to ensure it works
    const decrypted = await decryptAES(processedUsers[0].secret, encryptionKey);
    expect(decrypted).toBe('password123');

    // 4. Simulate sending the data to an AI model and estimating the cost
    const jsonString = JSON.stringify(processedUsers);
    const estimatedTokens = estimateTokens(jsonString);
    expect(estimatedTokens).toBeGreaterThan(10); // It should calculate a rough token count

    // 5. Use `poll` to simulate waiting for the AI job to finish
    let attempts = 0;
    const aiJob = async () => {
      attempts++;
      return attempts === 3 ? 'AI_FINISHED' : 'PROCESSING';
    };

    const finalStatus = await poll(aiJob, (status: any) => status === 'AI_FINISHED', 50, 5);
    expect(finalStatus).toBe('AI_FINISHED');
    expect(attempts).toBe(3); // It took 3 polls to finish
  });
});
