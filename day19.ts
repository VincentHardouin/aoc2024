import type { Day } from './Day.ts';

export class DayImpl implements Day {
  private readonly input: { patterns: string[][]; towels: string[][] };

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  parseInput(input: string) {
    const [patterns, towels] = input
      .trim()
      .split('\n\n');

    return {
      patterns: patterns.split(', ').map(v => v.split('')),
      towels: towels.split('\n').map(l => l.split('')),
    };
  }

  partOne() {
    const { patterns, towels } = this.input;
    return towels.filter(towel => combinations(towel, patterns) > 0).length;
  }

  partTwo() {
    const { patterns, towels } = this.input;
    return towels.reduce((a, towel) => a + combinations(towel, patterns), 0);
  }
}

function combinations(towel: string[], patterns: string[][]) {
  const memo: Record<number, number> = {};

  const recur = (pos: number) => {
    if (memo[pos] !== undefined)
      return memo[pos];
    if (pos === towel.length)
      return 1;

    const matches = patterns
      .filter((p) => {
        return p.every((pv, i) => towel[pos + i] !== undefined && towel[pos + i] === pv);
      });

    let result = 0;
    matches.forEach(p => result += recur(pos + p.length));
    memo[pos] = result;
    return result;
  };

  return recur(0);
}
