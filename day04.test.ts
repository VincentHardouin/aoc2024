import { describe, expect, it } from 'vitest';
import { DayImpl } from './day04.ts';

describe('day04', () => {
  describe('partOne', () => {
    it('should return', () => {
      const sample = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;

      expect(new DayImpl(sample).partOne()).toEqual(18);
    });
  });

  describe('partTwo', () => {
    it('should return 9', () => {
      const sample = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;

      expect(new DayImpl(sample).partTwo()).toEqual(9);
    });

    it('should return 0', () => {
      const sample = `MIS
IAI
SIM
`;

      expect(new DayImpl(sample).partTwo()).toEqual(0);
    });
  });
});
