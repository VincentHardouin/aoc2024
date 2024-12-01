import type { Day } from './Day.ts';
import { splitPairs } from './utils.js';

export class DayImpl implements Day {
  private readonly input: Array<Array<number>>;

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  parseInput(input: string) {
    return input
      .trim()
      .split('\n')
      .map((line: string) => {
        return line
          .split(/\s+/)
          .map(e => Number.parseInt(e, 10));
      });
  }

  partOne() {
    const [left, right] = splitPairs(this.input);
    left.sort();
    right.sort();
    return left.reduce((acc: number, value: number, index: number) => {
      const rightValue = right[index];
      return acc + Math.abs(value - rightValue);
    }, 0);
  }

  partTwo() {
    const [left, right] = splitPairs(this.input);
    const similarity: Record<number, number> = right.reduce((acc: Record<number, number>, val: number) => {
      acc[val] = (acc[val] ?? 0) + 1;
      return acc;
    }, {});
    return left.reduce((acc: number, value: number) => {
      return acc + value * (similarity[value] || 0);
    }, 0);
  }
}
