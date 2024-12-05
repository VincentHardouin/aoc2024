import type { Day } from './Day.ts';
import { splitPairs } from './utils.ts';

export class DayImpl implements Day {
  readonly input: { before: number[]; after: number[]; pageOrderingRules: string[]; updates: string[] };

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  parseInput(input: string) {
    const [pageOrderingRules, updates] = input
      .trim()
      .split('\n\n')
      .map((part: string) => {
        return part
          .split(/\n/);
      });
    const [before, after]: [number[], number[]] = splitPairs(pageOrderingRules.map(rule => rule.split('|').map(Number) as [number, number]));
    return { pageOrderingRules, updates, before, after };
  }

  partOne() {
    return this.input.updates
      .map(u => u.split(',').map(Number))
      .filter(u => updateIsValid(u, this.input.before, this.input.after))
      .map(update => update[Math.ceil(update.length / 2) - 1])
      .reduce((acc, val) => acc + val, 0);
  }

  partTwo() {
    return this.input.updates
      .map(u => u.split(',').map(Number))
      .filter(u => !updateIsValid(u, this.input.before, this.input.after))
      .map(u => reorderUpdate(u, this.input.before, this.input.after))
      .map(update => update[Math.ceil(update.length / 2) - 1])
      .reduce((acc, val) => acc + val, 0);
  }
}

function updateIsValid(update: number[], before: number[], after: number[]) {
  const result = update.filter((n, i) => {
    const shouldBeBefore = getBefore(n, before, after);
    if (shouldBeBefore.length === 0) {
      return true;
    }
    const filteredBeforeNumber = shouldBeBefore.filter((beforeNumber) => {
      const beforeIndexInUpdate = update.indexOf(beforeNumber);
      return beforeIndexInUpdate < i;
    });
    return filteredBeforeNumber.length === shouldBeBefore.length;
  });
  return result.join(',') === update.join(',');
}

function getBefore(number: number, before: number[], after: number[]) {
  const beforeIndexes = after.map((n, i) => n === number ? i : -1).filter(n => n >= 0);
  return before.filter((_, i) => beforeIndexes.includes(i));
}

export function reorderUpdate(update: number[], before: number[], after: number[]): number[] {
  return update.sort((a, b) => {
    const shouldBeBeforeForA = getBefore(a, before, after);
    const shouldBeBeforeForB = getBefore(b, before, after);

    if (shouldBeBeforeForA.includes(b)) {
      return 1;
    }
    if (shouldBeBeforeForB.includes(a)) {
      return -1;
    }
    return 0;
  });
}
