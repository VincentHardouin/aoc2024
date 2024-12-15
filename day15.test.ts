import { describe, expect, it } from 'vitest';
import { DayImpl, expandGrid } from './day15.ts';

const largerExample = `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^
`;

describe('day15', () => {
  describe('partOne', () => {
    it('should return 2028 for smaller example', () => {
      const sample = `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`;

      expect(new DayImpl(sample).partOne()).toEqual(2028);
    });

    it('should return 10092 for larger example', () => {
      expect(new DayImpl(largerExample).partOne()).toEqual(10092);
    });
  });

  describe('partTwo', () => {
    it('should return', () => {
      expect(new DayImpl(largerExample).partTwo()).toEqual(9021);
    });
  });

  describe('expandGrid', () => {
    it('should expand grid', () => {
      const line = '#.........O#...O.OO.OO.O##OO..#..O#O.O.........O.#';
      const grid = [line.split('')];

      const expectedResult = '##..................[]##......[]..[][]..[][]..[]####[][]....##....[]##[]..[]..................[]..##';
      expect(expandGrid(grid)[0].join('')).toEqual(expectedResult);
    });
  });
});
