import { describe, expect, it } from 'vitest';
import { DayImpl } from './day07.ts';

const sample = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

describe('day07', () => {
  describe('partOne', () => {
    it('should return', () => {
      expect(new DayImpl(sample).partOne()).toEqual(3749);
    });
  });

  describe('partTwo', () => {
    it('should return', () => {
      expect(new DayImpl(sample).partTwo()).toEqual(11387);
    });
  });
});
