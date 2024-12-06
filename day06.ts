import type { Day } from './Day.ts';
import { isInGrid } from './utils.ts';

const direction: number[][] = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

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
    const start = getStartPosition(this.input);
    const { visited } = walk(start, this.input, false);
    return visited.size;
  }

  partTwo() {
    let result = 0;
    const startPosition = getStartPosition(this.input);

    const { visited } = walk(startPosition, this.input, false);

    for (const position of [...visited]) {
      const [y, x] = position.split(',').map(Number);
      const cell = this.input[y][x];
      if (cell === '#' || cell === '^') {
        continue;
      }

      const clone = this.input.map(y => y.map(x => x));
      clone[y][x] = '#';

      if (walk(startPosition, clone, true).isLoop)
        result++;
    }

    return result;
  }
}

function getStartPosition(grid: string[][]) {
  const y = grid.findIndex(x => x.includes('^'));
  const x = grid[y].indexOf('^');
  return {
    y,
    x,
  };
}

function getNextPosition(curr: { x: number; y: number }, dirIndex: number) {
  const dir = direction[dirIndex];
  return { y: curr.y + dir[0], x: curr.x + dir[1] };
}

function walk(start: { x: number; y: number }, grid: string[][], loopDetection = true): { isLoop: boolean; visited: Set<string> } {
  const visited = new Set<string>();
  let dirIndex = 0;
  let curr = start;

  while (true) {
    const currKey = `${curr.y},${curr.x},${loopDetection ? dirIndex : ''}`;

    if (loopDetection && visited.has(currKey)) {
      return { isLoop: true, visited };
    }

    visited.add(currKey);

    const nextPosition = getNextPosition(curr, dirIndex);
    if (!isInGrid(grid, nextPosition.y, nextPosition.x)) {
      return { isLoop: false, visited };
    }

    const next = grid[nextPosition.y][nextPosition.x];
    if (next === '#') {
      dirIndex = (dirIndex + 1) % 4;
    }
    else {
      curr = nextPosition;
    }
  }
}
