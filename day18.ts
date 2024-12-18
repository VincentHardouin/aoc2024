import type { Day } from './Day.ts';
import type { Pos } from './utils.ts';

export class DayImpl implements Day {
  private readonly input: Pos[];

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  parseInput(input: string) {
    return input
      .trim()
      .split('\n')
      .map((line: string) => {
        return line
          .split(',')
          .map(Number) as Pos;
      });
  }

  partOne() {
    return findPath(this.input, 1024);
  }

  partTwo() {
    const obstacles = this.input;
    let latestPossible = 0;
    let firstImpossible = obstacles.length;

    while (firstImpossible - latestPossible > 1) {
      const middle = Math.trunc((firstImpossible + latestPossible) / 2);
      const isPossible = findPath(obstacles, middle) > -1;
      if (isPossible) {
        latestPossible = middle;
      }
      else {
        firstImpossible = middle;
      }
    }

    const bummer = obstacles[firstImpossible - 1];
    return `${bummer[0]},${bummer[1]}`;
  }
}

export function findPath(obstacles: Pos[], length: number) {
  const gridSize = getGridSize(obstacles);
  const obstacleSet = new Set<string>();
  for (let i = 0; i < length; ++i) {
    obstacleSet.add(getKey(obstacles[i]));
  }

  let queue = [{ pos: [0, 0] as Pos, cost: 0 }];
  const visited = new Map<string, number>();
  let minResult = Infinity;
  visited.set(getKey(queue[0].pos), 0);

  while (queue.length > 0) {
    const next = [];
    for (const entry of queue) {
      const candidates: Pos[] = [
        [entry.pos[0] + 1, entry.pos[1]],
        [entry.pos[0] - 1, entry.pos[1]],
        [entry.pos[0], entry.pos[1] - 1],
        [entry.pos[0], entry.pos[1] + 1],
      ];

      for (const pos of candidates) {
        if (pos[0] < 0 || pos[0] > gridSize) {
          continue;
        }
        if (pos[1] < 0 || pos[1] > gridSize) {
          continue;
        }
        if (obstacleSet.has(getKey(pos))) {
          continue;
        }
        const currentCost = getOrDefault(visited, getKey(pos), Infinity);
        const nextCost = entry.cost + 1;
        if (nextCost >= currentCost) {
          continue;
        }
        next.push({ pos, cost: nextCost });
        visited.set(getKey(pos), nextCost);
        if (pos[0] === gridSize && pos[1] === gridSize) {
          if (entry.cost <= minResult) {
            minResult = entry.cost;
          }
        }
      }
    }
    queue = next;
  }

  if (minResult !== Infinity) {
    return minResult + 1;
  }
  else {
    return -1;
  }
}

function getKey(pos: Pos) {
  return `${pos[0]}:${pos[1]}`;
}

function getGridSize(obstacles: Pos[]) {
  return Math.max(...obstacles.flatMap(pos => pos));
}

function getOrDefault<K, V>(map: Map<K, V>, key: K, def: V): V {
  return map.get(key) ?? def;
}
