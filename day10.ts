import type { Day } from './Day.ts';
import type { Pos } from './utils.ts';
import { directNeighbors } from './utils.ts';

export class DayImpl implements Day {
  private readonly input: number[][];

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  parseInput(input: string) {
    return input
      .trim()
      .split('\n')
      .map((line: string) => {
        return line
          .split('')
          .map(Number);
      });
  }

  partOne() {
    const starts = findStart(this.input);
    return starts
      .map((pos) => {
        const trails = findTrails(pos, this.input);
        return new Set(trails).size;
      })
      .reduce((acc, val) => acc + val, 0);
  }

  partTwo() {
    const starts = findStart(this.input);
    return starts
      .map((pos) => {
        const trails = findTrails(pos, this.input);
        return trails.length;
      })
      .reduce((acc, val) => acc + val, 0);
  }
}

function findStart(grid: number[][]): Pos[] {
  return grid
    .flatMap((line, y) => {
      if (!line.includes(0)) {
        return [];
      }
      return line.map((value: number, x) => {
        return [value, [y, x] as Pos];
      });
    })
    .filter(([value]) => value === 0)
    .map(([_, pos]) => pos as Pos);
}

function findTrails(pos: Pos, grid: number[][]) {
  const trails = [];
  const queue = [pos];

  while (queue.length) {
    const [cy, cx] = queue.shift()!;

    if (grid[cy][cx] === 9) {
      trails.push(`${cy},${cx}`);
    }

    const nextPositions = directNeighbors
      .map(([dy, dx]) => [cy + dy, cx + dx] as Pos)
      .filter(([y, x]) => {
        return grid[y]?.[x] === grid[cy][cx] + 1;
      });
    queue.push(...nextPositions);
  }

  return trails;
}
