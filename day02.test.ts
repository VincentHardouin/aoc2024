import { describe, expect, it } from 'vitest';
import { DayImpl } from './day02.ts';

describe('day02', () => {
  describe('partOne', () => {
    it('should return', () => {
      const sample = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 6 1
1 3 6 7 9`;

      expect(new DayImpl(sample).partOne()).toEqual(2);
    });
  });

  describe('partTwo', () => {
    it('should return', () => {
      const sample = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

      expect(new DayImpl(sample).partTwo()).toEqual(4);
    });
  });
});
