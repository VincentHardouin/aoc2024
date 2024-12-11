import type { Day } from './Day.ts';

export class DayImpl implements Day {
  private readonly input: number[];

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  parseInput(input: string) {
    return input
      .trim()
      .split(/\s+/)
      .map(Number);
  }

  partOne() {
    let count = 0;
    const cache = new Map();
    for (const num of this.input) {
      count += blink(num, 0, 25, cache);
    }
    return count;
  }

  partTwo() {
    let count = 0;
    const cache = new Map<string, number>();
    for (const num of this.input) {
      count += blink(num, 0, 75, cache);
    }
    return count;
  }
}

function blink(num: number, depth: number, target: number, cache: Map<string, number>): number {
  const key = `${num}.${depth}`;
  if (cache.has(key)) {
    return cache.get(key)!;
  }

  let result: number = 0;
  const nextDepth = depth + 1;
  if (depth === target) {
    result = 1;
  }
  else if (num === 0) {
    result = blink(1, nextDepth, target, cache);
  }
  else {
    const str = num.toString();
    if (str.length % 2 === 0) {
      const half = str.length / 2;
      const [left, right] = [str.substring(0, half), str.substring(half, str.length)];
      result = blink(Number(left), nextDepth, target, cache) + blink(Number(right), nextDepth, target, cache);
    }
    else {
      result = blink(num * 2024, nextDepth, target, cache);
    }
  }

  cache.set(key, result);
  return result;
}
