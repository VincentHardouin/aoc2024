import { describe, expect, it } from 'vitest';
import { DayImpl } from './day22.ts';

describe('day22', () => {
  describe('partOne', () => {
    it('should return', () => {
      const sample = `1
10
100
2024
`;

      expect(new DayImpl(sample).partOne()).toEqual(37327623n);
    });
  });

  describe('partTwo', () => {
    it('should return', () => {
      const sample = `1
10
100
2024
`;

      expect(new DayImpl(sample).partTwo()).toEqual(23);
    });
  });
});
