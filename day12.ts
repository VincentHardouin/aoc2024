import type { Day } from './Day.ts';
import { directNeighbors, enumGrid, isInGrid, type Pos } from './utils.ts';

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
    let price = 0;
    const visited = new Set<string>();
    for (const { x, y } of enumGrid(this.input)) {
      const key = `${y},${x}`;
      if (!visited.has(key)) {
        const { plotArea, edges } = getRegion([y, x], false, this.input, visited);
        price += plotArea * edges;
      }
    }
    return price;
  }

  partTwo() {
    let price = 0;
    const visited = new Set<string>();
    for (const { x, y } of enumGrid(this.input)) {
      const key = `${y},${x}`;
      if (!visited.has(key)) {
        const { plotArea, edges } = getRegion([y, x], true, this.input, visited);
        price += plotArea * edges;
      }
    }
    return price;
  }
}

function getRegion(pos: Pos, bySide: boolean, grid: string[][], visited: Set<string>) {
  let plotArea = 0;

  const edges = new Set();
  let edgeCount = 0;

  const val = grid[pos[0]][pos[1]];

  const queue = [pos];

  while (queue.length > 0) {
    const current = queue.shift()!;
    const key = current.join(',');

    if (visited.has(key)) {
      continue;
    }
    visited.add(key);

    plotArea += 1;

    const neighbors = getNeighbors(current);
    for (let polarity = 0; polarity < neighbors.length; polarity++) {
      const [y, x] = neighbors[polarity];
      if (!isInGrid(grid, y, x) || grid[y][x] !== val) {
        edgeCount += 1;

        edges.add(`${polarity},${y},${x}`);

        if (bySide) {
          for (const n2 of getNeighbors([y, x])) {
            if (edges.has(`${polarity},${n2[0]},${n2[1]}`)) {
              edgeCount -= 1;
            }
          }
        }
      }
      else {
        queue.push([y, x]);
      }
    }
  }

  return { plotArea, edges: edgeCount, val };
}

function getNeighbors(pos: Pos) {
  return directNeighbors.map(([y, x]) => {
    return [pos[0] + y, pos[1] + x] as Pos;
  });
}
