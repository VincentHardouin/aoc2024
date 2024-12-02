import type { Day } from './Day.ts';

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
    return this.input.reduce((acc, value) => {
      return this.checkReport(value) ? acc + 1 : acc;
    }, 0);
  }

  checkReport(line: Array<number>) {
    let order = 0;
    for (let i = 0; i < line.length - 1; i++) {
      const diff = line[i] - line[i + 1];
      if (i === 0) {
        order = diff;
      }
      if (order === 0) {
        return false;
      }
      if (order > 0 && (diff > 3 || diff < 1)) {
        return false;
      }
      if (order < 0 && (diff < -3 || diff > -1)) {
        return false;
      }
    }
    return true;
  }

  partTwo() {
    return this.input.reduce((acc, value) => {
      if (this.checkReport(value)) {
        return acc + 1;
      }

      for (let i = 0; i < value.length; i++) {
        const clone = [...value];
        delete clone[i];
        if (this.checkReport(clone.filter(Number))) {
          return acc + 1;
        }
      }
      return acc;
    }, 0);
  }
}
