import { describe, expect, it } from 'vitest';
import { DayImpl } from './day21.ts';

describe('day21', () => {
  describe('partOne', () => {
    it('should return', () => {
      const sample = `029A
980A
179A
456A
379A
`;

      expect(new DayImpl(sample).partOne()).toEqual(126384);
    });
  });
});
