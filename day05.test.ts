import { describe, expect, it } from 'vitest';
import { DayImpl, reorderUpdate } from './day05.ts';

const sample = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

describe('day05', () => {
  describe('partOne', () => {
    it('should return', () => {
      expect(new DayImpl(sample).partOne()).toEqual(143);
    });
  });

  describe('partTwo', () => {
    it('should return', () => {
      expect(new DayImpl(sample).partTwo()).toEqual(123);
    });
  });

  describe('#reorderUpdate', () => {
    it('should reorder', () => {
      const parsedInput = new DayImpl(sample).input;

      const result = reorderUpdate([75, 97, 47, 61, 53], parsedInput.before, parsedInput.after);

      expect(result).toStrictEqual([97, 75, 47, 61, 53]);
    });
  });
});
