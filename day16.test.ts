import { describe, expect, it } from 'vitest';
import { DayImpl } from './day16.ts';

const first = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.# 
#S..#.....#...#
###############`;

const second = `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`;

describe('day16', () => {
  describe('partOne', () => {
    it('should return 7036 for the first example ', () => {
      expect(new DayImpl(first).partOne()).toEqual(7036);
    });

    it('should return 11048 for the second example ', () => {
      expect(new DayImpl(second).partOne()).toEqual(11048);
    });
  });

  describe('partTwo', () => {
    it('should return 45 for the first example', () => {
      expect(new DayImpl(first).partTwo()).toEqual(45);
    });

    it('should return 64 for the second example', () => {
      expect(new DayImpl(second).partTwo()).toEqual(64);
    });
  });
});
