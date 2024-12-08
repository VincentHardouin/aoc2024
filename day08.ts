import type { Day } from './Day.ts';
import { enumGrid } from './utils.ts';

export class DayImpl implements Day {
  private readonly input: string[][];

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  parseInput(input: string) {
    return input
      .trim()
      .split('\n')
      .map((line: string) => {
        return line
          .split('');
      });
  }

  partOne() {
    const antennas = antennasPositions(this.input);
    return getUniqAntinodes(this.input, antennas, false);
  }

  partTwo() {
    const antennas = antennasPositions(this.input);
    return getUniqAntinodes(this.input, antennas, true);
  }
}

function antennasPositions(grid: string[][]) {
  const antennas = new Map();
  for (const { x, y, cell } of enumGrid(grid)) {
    if (cell === '.') {
      continue;
    }
    if (!antennas.has(cell)) {
      antennas.set(cell, []);
    }
    antennas.get(cell).push([x, y]);
  }
  return antennas;
}

function getUniqAntinodes(grid: string[][], antennas: Map<string, number[][]>, extended: boolean): number {
  const antinodes = new Set();
  for (const [_, positions] of antennas) {
    positions.forEach(([y, x], i) => {
      positions
        .filter((_, j) => i !== j)
        .reduce((acc, [y2, x2]) => {
          const [dy, dx] = [y2 - y, x2 - x];

          const k = extended ? 1 : 2;
          let [py, px] = [y + k * dy, x + k * dx];

          if (!extended) {
            acc.push([py, px]);
            return acc;
          }

          while (grid[py]?.[px]) {
            acc.push([py, px]);
            [py, px] = [py + dy, px + dx];
          }
          return acc;
        }, [] as number[][])
        .filter(([y, x]) => grid[y]?.[x])
        .forEach((position: number[]) => antinodes.add(position.join(',')));
    });
  }
  return antinodes.size;
}
