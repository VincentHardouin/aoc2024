import type { Day } from './Day.ts';
import { getPositionOfUniqElement } from './utils.ts';

interface Point { x: number; y: number }

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

  partOne({ atLeast = 100 } = {}) {
    const findStart = getPositionOfUniqElement(this.input, 'S');

    const distances = bfs(this.input, { x: findStart[1], y: findStart[0] });

    let cheats = 0;
    const walkable = Object.keys(distances);
    for (let i = 0; i < walkable.length; i++) {
      for (let j = 0; j < walkable.length; j++) {
        if (i === j) {
          continue;
        }

        const start = walkable[i].split(',').map(num => Number.parseInt(num));
        const end = walkable[j].split(',').map(num => Number.parseInt(num));

        const dist = Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]);

        if (dist <= 2 && distances[walkable[i]] - distances[walkable[j]] - dist >= atLeast)
          cheats++;
      }
    }
    return cheats;
  }

  partTwo({ atLeast = 100 } = {}) {
    const findStart = getPositionOfUniqElement(this.input, 'S');

    const distances = bfs(this.input, { x: findStart[1], y: findStart[0] });

    let cheats = 0;
    const walkable = Object.keys(distances);
    for (let i = 0; i < walkable.length; i++) {
      for (let j = 0; j < walkable.length; j++) {
        if (i === j) {
          continue;
        }

        const start = walkable[i].split(',').map(num => Number.parseInt(num));
        const end = walkable[j].split(',').map(num => Number.parseInt(num));

        const dist = Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]);

        if (dist <= 20 && distances[walkable[i]] - distances[walkable[j]] - dist >= atLeast)
          cheats++;
      }
    }
    return cheats;
  }
}

function bfs(grid: string[][], start: Point) {
  const height = grid.length;
  const width = grid[0].length;

  const queue: { x: number; y: number; steps: number }[] = [];
  const distances: { [key: string]: number } = {};

  queue.push({ ...start, steps: 0 });
  distances[`${start.x},${start.y}`] = 0;

  while (queue.length !== 0) {
    const current = queue.shift();
    if (current === undefined)
      break;

    [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ].forEach(([y, x]) => {
      const position = { x: current.x + x, y: current.y + y };
      if (position.x < 0 || position.x >= width || position.y < 0 || position.y >= height || grid[position.y][position.x] === '#')
        return;

      const newDistance = current.steps + 1;
      const key = `${position.x},${position.y}`;
      if (distances[key] === undefined || distances[key] > newDistance) {
        queue.push({ ...position, steps: current.steps + 1 });
        distances[`${position.x},${position.y}`] = newDistance;
      }
    });
  }

  return distances;
}
