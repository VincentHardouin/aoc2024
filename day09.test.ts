import { describe, expect, it } from 'vitest';
import { DayImpl } from './day09.ts';

describe('day09', () => {
  describe('partOne', () => {
    it('should return', () => {
      const sample = `2333133121414131402`;

      expect(new DayImpl(sample).partOne()).toEqual(1928);
    });
  });

  describe('partTwo', () => {
    it('should return', () => {
      const sample = `2333133121414131402`;

      expect(new DayImpl(sample).partTwo()).toEqual(2858);
    });
  });
});
