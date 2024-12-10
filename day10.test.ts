import { describe, expect, it } from 'vitest';
import { DayImpl } from './day10.ts';

const sample = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
`;

describe('day10', () => {
  describe('partOne', () => {
    it('should return', () => {
      expect(new DayImpl(sample).partOne()).toEqual(36);
    });
  });

  describe('partTwo', () => {
    it('should return', () => {
      expect(new DayImpl(sample).partTwo()).toEqual(81);
    });
  });
});
