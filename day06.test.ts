import { describe, expect, it } from 'vitest';
import { DayImpl } from './day06.ts';

const sample = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`;

describe('day06', () => {
  describe('partOne', () => {
    it('should return', () => {
      expect(new DayImpl(sample).partOne()).toEqual(41);
    });
  });

  describe('partTwo', () => {
    it('should return', () => {
      expect(new DayImpl(sample).partTwo()).toEqual(6);
    });
  });
});
