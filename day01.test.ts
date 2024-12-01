import { describe, expect, it } from 'vitest';
import { DayImpl } from './day01.ts';

describe('day01', () => {
  describe('partOne', () => {
    it('should return 11', () => {
      const sample = `
3   4
4   3
2   5
1   3
3   9
3   3`;

      expect(new DayImpl(sample).partOne()).toEqual(11);
    });
  });

  describe('partTwo', () => {
    it('should return 31', () => {
      const sample = `
3   4
4   3
2   5
1   3
3   9
3   3`;

      expect(new DayImpl(sample).partTwo()).toEqual(31);
    });
  });
});
