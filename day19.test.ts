import { describe, expect, it } from 'vitest';
import { DayImpl } from './day19.ts';

describe('day19', () => {
  describe('partOne', () => {
    it('should return', () => {
      const sample = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb
`;

      expect(new DayImpl(sample).partOne()).toEqual(6);
    });
  });

  describe('partTwo', () => {
    it('should return', () => {
      const sample = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb
`;

      expect(new DayImpl(sample).partTwo()).toEqual(16);
    });
  });
});
