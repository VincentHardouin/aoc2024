import type { Day } from './Day.ts';

export class DayImpl implements Day {
  private readonly input: string[];

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  parseInput(input: string) {
    return input
      .trim()
      .split('\n\n');
  }

  partOne() {
    const keys: number[][] = this.input.filter(block => block.startsWith('.')).map(toPins);
    const locks: number[][] = this.input.filter(block => block.startsWith('#')).map(toPins);

    return keys
      .map((key) => {
        return locks
          .filter(lock => !lock.some((x, i) => x + key[i] > 7))
          .length;
      })
      .reduce((sum, val) => sum + val, 0);
  }

  partTwo() {
  }
}

function toPins(block: string): number[] {
  return block
    .split('\n')
    .map((line: string) => {
      return line
        .split('')
        .map((char: string): number => {
          return char === '#' ? 1 : 0;
        });
    })
    .reduce((total, row) => total.map((x, i) => x + row[i]));
}
