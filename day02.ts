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
    return this.input.map(checkReport).filter(Boolean).length;
  }

  partTwo() {
    return this.input.map(checkReportWithDampener).filter(Boolean).length;
  }
}

function checkReport(line: number[]) {
  const order = line[0] - line[1];
  for (let i = 0; i < line.length - 1; i++) {
    const diff = line[i] - line[i + 1];
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

function checkReportWithDampener(line: number[]) {
  if (checkReport(line)) {
    return true;
  }

  for (let i = 0; i < line.length; i++) {
    const clone = [...line];
    delete clone[i];
    if (checkReport(clone.filter(Number))) {
      return true;
    }
  }
  return false;
}
