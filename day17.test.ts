import { describe, expect, it } from 'vitest';
import { DayImpl } from './day17.ts';

describe('day17', () => {
  describe('partOne', () => {
    it('should return', () => {
      const sample = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

      expect(new DayImpl(sample).partOne()).toEqual('4,6,3,5,6,3,5,2,1,0');
    });
  });

  describe('partTwo', () => {
    it('should return', () => {
      const sample = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`;

      expect(new DayImpl(sample).partTwo()).toEqual(117440n);
    });
  });
});
