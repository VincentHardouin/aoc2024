import type { Day } from './Day.ts';

export class DayImpl implements Day {
  private readonly input: string;

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  parseInput(input: string) {
    return input
      .trim();
  }

  partOne() {
    const regex = /mul\((?<left>\d+),(?<right>\d+)\)/g;
    const matches = [...this.input.matchAll(regex)];
    return matches
      .map(({ groups }) => {
        if (groups?.left && groups?.right) {
          return Number(groups.left) * Number(groups.right);
        }
        return 0;
      })
      .reduce((acc, val) => acc + val, 0);
  }

  partTwo() {
    const regex = /(?<mul>mul\((?<left>\d+),(?<right>\d+)\))|(?<do>do\(\))|(?<dont>don't\(\))/g;
    const matches = [...this.input.matchAll(regex)];
    let deactivate = false;
    return matches
      .map(({ groups }) => {
        if (groups?.dont) {
          deactivate = true;
        }
        if (groups?.do) {
          deactivate = false;
        }
        if (!deactivate && groups?.left && groups?.right) {
          return Number(groups.left) * Number(groups.right);
        }
        return 0;
      })
      .reduce((acc, val) => acc + val, 0);
  }
}
