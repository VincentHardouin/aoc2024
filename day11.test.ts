import { describe, expect, it } from 'vitest';
import { DayImpl } from './day11.ts';

describe('day11', () => {
  describe('partOne', () => {
    it('should return', () => {
      const sample = `125 17`;

      expect(new DayImpl(sample).partOne()).toEqual(55312);
    });
  });
});
