import type { Day } from './Day.ts';
import { enumGrid, getPositionOfUniqElement, isInGrid, MinHeap, type Pos } from './utils.ts';

interface AdjacencyList { [key: string]: { [key: string]: number } }

// EAST, SOUTH, WEST, NORTH
const DIRECTIONS: Pos[] = [[0, 1], [1, 0], [0, -1], [-1, 0]];

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
    const { start, end, forward } = parseGrid(this.input);
    const distances = dijkstra(forward, start, false);
    return distances[getPosKey(end)];
  }

  partTwo() {
    const { start, end, forward, reverse } = parseGrid(this.input);
    const fromStart = dijkstra(forward, start, false);
    const toEnd = dijkstra(reverse, end, true);

    const endKey = getPosKey(end);
    const target = fromStart[endKey];
    const spaces = new Set<string>();

    Object.keys(fromStart).forEach((position) => {
      if (position !== endKey && fromStart[position] + toEnd[position] === target) {
        const [x, y] = position.split(',');
        spaces.add(`${x},${y}`);
      }
    });

    return spaces.size;
  }
}

function parseGrid(grid: string[][]) {
  const start: Pos = getPositionOfUniqElement(grid, 'S');
  const end: Pos = getPositionOfUniqElement(grid, 'E');

  const forward: AdjacencyList = {};
  const reverse: AdjacencyList = {};

  for (const { x, y, cell } of enumGrid(grid)) {
    if (cell === '#') {
      continue;
    }

    DIRECTIONS.forEach(([y2, x2], i) => {
      const [pY, pX] = [y + y2, x + x2];
      const key = `${y},${x},${i}`;
      const moveKey = `${pY},${pX},${i}`;

      if (isInGrid(grid, pY, pX) && grid[pY][pX] !== '#') {
        forward[key] ??= {};
        reverse[moveKey] ??= {};

        forward[key][moveKey] = 1;
        reverse[moveKey][key] = 1;
      }

      for (const rotateKey of [`${y},${x},${(i + 3) % 4}`, `${y},${x},${(i + 1) % 4}`]) {
        forward[key] ??= {};
        reverse[rotateKey] ??= {};

        forward[key][rotateKey] = 1000;
        reverse[rotateKey][key] = 1000;
      }
    });
  }

  DIRECTIONS.forEach((_, i) => {
    const key = getPosKey(end);
    const rotateKey = `${key},${i}`;

    forward[rotateKey] ??= {};
    reverse[key] ??= {};

    forward[rotateKey][key] = 0;
    reverse[key][rotateKey] = 0;
  });

  return { start, end, forward, reverse };
}

function getPosKey(pos: Pos) {
  return `${pos[0]},${pos[1]}`;
}

function dijkstra(graph: AdjacencyList, start: Pos, directionless: boolean): { [key: string]: number } {
  const queue = new MinHeap();
  const distances: { [key: string]: number } = {};

  const startingKey = directionless ? getPosKey(start) : `${getPosKey(start)},0`;

  queue.insert({ score: 0, node: startingKey });
  distances[startingKey] = 0;

  while (queue.size()) {
    const current = queue.extractMin();

    if (distances[current.node] < current.score) {
      continue;
    }

    if (!graph[current.node]) {
      continue;
    }

    Object.entries(graph[current.node]).forEach(([next, weight]) => {
      const newScore = current.score + weight;
      if (distances[next] === undefined || distances[next] > newScore) {
        distances[next] = newScore;
        queue.insert({ score: newScore, node: next });
      }
    });
  }

  return distances;
}
