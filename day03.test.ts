import { describe, expect, it } from 'vitest';
import { DayImpl } from './day03.ts';

describe('day03', () => {
  describe('partOne', () => {
    it('should return', () => {
      const sample = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

      expect(new DayImpl(sample).partOne()).toEqual(161);
    });
  });

  describe('partTwo', () => {
    it('should return', () => {
      const sample = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

      expect(new DayImpl(sample).partTwo()).toEqual(48);
    });
  });
});
