import type { Day } from './Day.ts';
import { enumGrid } from './utils.ts';

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
          .split('');
      });
  }

  partOne() {
    const antinodes = new Set();
    const antennas = antennasPositions(this.input);
    for (const [_, positions] of antennas) {
      positions.forEach(([y, x], i) => {
        positions
          .filter((_, j) => i !== j)
          .map(([y2, x2]) => {
            const dy = y2 - y;
            const dx = x2 - x;
            return [
              y + 2 * dy,
              x + 2 * dx,
            ];
          })
          .filter(([y, x]) => this.input[y]?.[x])
          .forEach((position: number[]) => antinodes.add(position.join(',')));
      });
    }
    return antinodes.size;
  }

  partTwo() {
    const antinodes = new Set();
    const antennas = antennasPositions(this.input);
    for (const [_, positions] of antennas) {
      positions.forEach(([y, x], i) => {
        positions
          .filter((_, j) => i !== j)
          .reduce((acc, [y2, x2]) => {
            const [dy, dx] = [y2 - y, x2 - x];
            let [py, px] = [y + dy, x + dx];
            while (this.input[py]?.[px]) {
              acc.push([py, px]);
              [py, px] = [py + dy, px + dx];
            }
            return acc;
          }, [])
          .filter(([y, x]) => this.input[y]?.[x])
          .forEach((position: number[]) => antinodes.add(position.join(',')));
      });
    }
    return antinodes.size;
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
