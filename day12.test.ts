import { describe, expect, it } from 'vitest';
import { DayImpl } from './day12.ts';

const sample = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE
`;

describe('day12', () => {
  describe('partOne', () => {
    it('should return', () => {
      expect(new DayImpl(sample).partOne()).toEqual(1930);
    });
  });

  describe('partTwo', () => {
    it('should return', () => {
      expect(new DayImpl(sample).partTwo()).toEqual(1206);
    });
  });
});
