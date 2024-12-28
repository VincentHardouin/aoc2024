import { describe, expect, it } from 'vitest';
import { DayImpl } from './day25.ts';

describe('day25', () => {
  describe('partOne', () => {
    it('should return', () => {
      const sample = `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####
`;

      expect(new DayImpl(sample).partOne()).toEqual(3);
    });
  });

  describe('partTwo', () => {
    it('should return', () => {
      const sample = ``;

      expect(new DayImpl(sample).partTwo()).toEqual();
    });
  });
});
